import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    /**
     * User Defined Modules
     */
    DogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
