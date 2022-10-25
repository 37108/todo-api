import * as fs from 'fs';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import initSqlJs from 'sql.js';

import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  try {
    fs.readFileSync('db.sqlite');
  } catch (err) {
    fs.writeFileSync('db.sqlite', '');
  }
  const buffer = fs.readFileSync('db.sqlite');
  const sql = await initSqlJs();
  const db = new sql.Database(buffer);
  await db.run('CREATE TABLE user (id, username, password);');
  await db.run('CREATE TABLE dog (id, name, age, breed);');
  await db.run(`CREATE TABLE task
    (id, title, description, status, deadline, working_hours, created, updated);`);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const userService = app.get(UsersService);
  userService.create({
    id: 'john_1',
    username: 'john',
    password: '1q2w3e',
  });
  userService.create({
    id: 'amy_1',
    username: 'amy',
    password: '3e2w1q',
  });

  const config = new DocumentBuilder()
    .setTitle('todo app')
    .setDescription('simple todo application')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
