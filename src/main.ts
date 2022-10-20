import * as fs from 'fs';
import initSqlJs from 'sql.js';
import { NestFactory } from '@nestjs/core';
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
  db.run('CREATE TABLE dogs (name, age, breed);');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
