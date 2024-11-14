import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([TodoEntity])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'todos', method: RequestMethod.POST },
                { path: 'todos/:id', method: RequestMethod.PUT },
                { path: 'todos/:id', method: RequestMethod.DELETE }
            );
    }
}
