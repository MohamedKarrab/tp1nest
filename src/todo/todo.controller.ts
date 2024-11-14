import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import {CreateTodoDto} from "./dto/create-todo.tdo";
import {UpdateTodoDto} from "./dto/update-todo.tdo";
import { StatusEnum } from './enums/status.enum';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    async addTodo(
        @Body() createTodoDto: CreateTodoDto,
        @Req() req
    ): Promise<TodoEntity> {
        const userId = req.userId;
        return this.todoService.addTodo(createTodoDto, userId);
    }

    @Put(':id')
    async updateTodo(
        @Param('id') id: number,
        @Body() updateTodoDto: UpdateTodoDto,
        @Req() req
    ): Promise<any> {
        const userId = req.userId;
        const todo = await this.todoService.getTodoById(id);

        if (todo.userId !== userId) {
            throw new NotFoundException('Vous n\'êtes pas autorisé à modifier ce Todo.');
        }

        return await this.todoService.updateTodo(id, updateTodoDto);
    }

    @Delete(':id')
    async deleteTodo(
        @Param('id') id: number,
        @Req() req
    ): Promise<void> {
        const userId = req.userId;
        const todo = await this.todoService.getTodoById(id);

        if (todo.userId !== userId) {
            throw new NotFoundException('Vous n\'êtes pas autorisé à supprimer ce Todo.');
        }

        await this.todoService.deleteTodo(id);
    }

    @Put('restore/:id')
    async restoreTodo(@Param('id') id: number): Promise<any> {
        try {
            return await this.todoService.restoreTodo(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get('count-by-status')
    async countTodosByStatus() {
        return await this.todoService.countTodosByStatus();
    }

    @Get()
    async getAllTodos(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{ data: TodoEntity[], total: number }> {
        return this.todoService.getAllTodos(page, limit);
    }

    @Get('search')
    async searchTodos(
        @Query('text') searchTerm?: string,
        @Query('status') status?: StatusEnum,
    ) {
        return await this.todoService.searchTodos(searchTerm, status);
    }

    @Get(':id')
    async getTodoById(@Param('id') id: number) {
        try {
            return await this.todoService.getTodoById(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
