import { Body, Controller, Delete, Get, Post, Put, Param, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo.model';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

@Get()
getTodo(@Req() req: any): Promise<Array<Todo>> {
    return this.todoService.find(req);
}

@Post()
postTodo(@Req() req: any, @Body() todoBody: Todo ): Promise<Todo> {
    return this.todoService.create(req, todoBody);
}

@Put()
updateTodo(@Req() req: any, @Body() todoBody: Todo): Promise<Todo> {
    return this.todoService.update(req, todoBody);
}

@Delete(':id')
deleteTodo(@Param('id') id: number): Promise<any> {
    return this.todoService.delete(id);
}
}
