import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from '@nestjs/common';
import {TodoService} from './todo.service';
import {TodoEntity} from './entities/todo.entity';
import {CreateTodoDto} from "./dto/create-todo.tdo";
import {UpdateTodoDto} from "./dto/update-todo.tdo";
import {StatusEnum} from "./enums/status.enum";

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    // V1
    @Post()
    async addTodo(@Body() createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoService.addTodo(createTodoDto);
    }

    // V2 (Sans service)
    // @Post()
    // async addTodo(@Body() createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    //     // Crée ici instance de TodoEntity
    //     const todo = this.todoRepository.create(createTodoDto);

    //     return this.todoRepository.save(todo);
    // }

    @Put(':id')
    async updateTodo(
        @Param('id') id: number,
        @Body() updateTodoDto: UpdateTodoDto,
    ): Promise<any> {
        try {
            return await this.todoService.updateTodo(id, updateTodoDto);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: number): Promise<void> {
        try {
            await this.todoService.deleteTodo(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
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

    // Without pagination
    // @Get()
    // async getAllTodos() {
    //     return await this.todoService.getAllTodos();
    // }

    // With pagination
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