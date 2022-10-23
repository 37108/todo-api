import * as fs from 'fs';
import initSqlJs from 'sql.js';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    fs.readFileSync('db.sqlite');
  } catch (err) {
    fs.writeFileSync('db.sqlite', '');
  }
  const buffer = fs.readFileSync('db.sqlite');
  const sql = await initSqlJs();
  const db = new sql.Database(buffer);
  db.run('CREATE TABLE dog (id, name, age, breed);');
  db.run(
    `CREATE TABLE task
      (id, title, description, status, deadline, working_hours, created, updated);`,
  );

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('todo app')
    .setDescription('simple todo application')
    .setVersion('1.0.0')
    .addTag('task')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
