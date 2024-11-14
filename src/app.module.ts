import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModuleModule } from './common-module/common-module.module';
import { TestController } from './test/test/test.controller';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TodoEntity} from "./todo/entities/todo.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [TodoEntity],
        synchronize: true, // Only for devs
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TodoModule,
    CommonModuleModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
