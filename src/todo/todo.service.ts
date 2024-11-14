import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {IsNull, Not, Repository} from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { StatusEnum } from './enums/status.enum';
import {CreateTodoDto} from "./dto/create-todo.tdo";
import {UpdateTodoDto} from "./dto/update-todo.tdo";

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private todoRepository: Repository<TodoEntity>,
    ) {}

    async addTodo(createTodoDto: CreateTodoDto, userId: number): Promise<TodoEntity> {
        const todo = this.todoRepository.create({ ...createTodoDto, userId });
        return this.todoRepository.save(todo);
    }

    async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {

        const todo = await this.todoRepository.findOne({
            where: { id },
        });
        if (!todo) {
            throw new NotFoundException('Todo non trouvé');
        }
        Object.assign(todo, updateTodoDto);
        return this.todoRepository.save(todo);
    }

    async deleteTodo(id: number): Promise<void> {
        const todo = await this.todoRepository.findOne({
            where: { id },
        });

        if (!todo) {
            throw new NotFoundException('Todo non trouvé');
        }

        // hard delete
        // await this.todoRepository.remove(todo);

        // soft delete
        todo.deletedAt = new Date();
        await this.todoRepository.save(todo);
    }

    async restoreTodo(id: number): Promise<TodoEntity> {
        const todo = await this.todoRepository.findOne({
            where: { id, deletedAt: Not(IsNull()) },
            withDeleted: true,        // Else the deleted todos won't show up
        });

        if (!todo) {
            throw new NotFoundException('Todo non trouvé ou non supprimé');
        }

        todo.deletedAt = null;
        return this.todoRepository.save(todo);
    }

    async countTodosByStatus(): Promise<{ [key in StatusEnum]: number }> {
        const todos = await this.todoRepository
            .createQueryBuilder('todo')
            .select('todo.status', 'status')  // Rename to fix error
            .addSelect('COUNT(todo.id)', 'count')
            .where('todo.deletedAt IS NULL')
            .groupBy('todo.status')
            .getRawMany();

        const result = {
            [StatusEnum.PENDING]: 0,
            [StatusEnum.IN_PROGRESS]: 0,
            [StatusEnum.DONE]: 0,
        };

        todos.forEach((todo) => {
            result[todo.status as StatusEnum] = Number(todo.count);
        });

        return result;
    }


    // no pagination
    // async getAllTodos(): Promise<TodoEntity[]> {
    //     return this.todoRepository.find({
    //         where: { deletedAt: null },
    //     });
    // }

    // With pagination
    async getAllTodos(page: number = 1, limit: number = 10): Promise<{ data: TodoEntity[], total: number }> {
        const [data, total] = await this.todoRepository.findAndCount({
            where: { deletedAt: null },
            skip: (page - 1) * limit, // Offset
            take: limit, // limit by page
        });

        return {
            data,
            total,
        };
    }

    async getTodoById(id: number): Promise<TodoEntity> {
        const todo = await this.todoRepository.findOne({
            where: { id, deletedAt: null },
        });

        if (!todo) {
            throw new NotFoundException('Todo non trouvé');
        }

        return todo;
    }

    async searchTodos(
        searchTerm?: string,
        status?: StatusEnum,
    ): Promise<TodoEntity[]> {
        const queryBuilder = this.todoRepository.createQueryBuilder('todo');

        if (searchTerm) {
            queryBuilder.andWhere(
                '(todo.name LIKE :searchTerm OR todo.description LIKE :searchTerm)',
                { searchTerm: `%${searchTerm}%` },
            );
        }

        if (status) {
            queryBuilder.andWhere('todo.status = :status', { status });
        }

        queryBuilder.andWhere('todo.deletedAt IS NULL');

        return queryBuilder.getMany();
    }
}
