import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { DogsModule } from './dogs/dogs.module';
import { AppService } from './app.service';

@Module({
  imports: [
    DogsModule,
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: 'db.sqlite',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
