import * as fs from 'fs';
import initSqlJs from 'sql.js';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
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
  await app.listen(3000);
}
bootstrap();
