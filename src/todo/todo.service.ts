import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../models/todo.model';
@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>) {}

    /**
     * The find function returns a promise that resolves to an array of Todo objects, filtered by the
     * userId and populated with the corresponding user object.
     * @param req - The "req" parameter is an object that represents the HTTP request made to the
     * server. It typically contains information such as the request method, headers, body, and user
     * authentication details. In this case, it is being used to access the user's ID.
     * @returns a promise that resolves to an array of Todo objects.
     */
    find(req): Promise<Array<Todo>> {
        const userId = req.user._id;
        return this.todoModel.find({userId}).populate('userId');
    }

    /**
     * The function creates a new todo item and saves it to the database with the user ID.
     * @param req - The `req` parameter is an object that represents the HTTP request made to the
     * server. It typically contains information such as the request method, headers, and body.
     * @param {Todo} todoBody - The `todoBody` parameter is an object that represents the data for a
     * new todo item. It typically includes properties such as `title`, `description`, `dueDate`, etc.
     * @returns a Promise that resolves to a Todo object.
     */
    create(req, todoBody: Todo): Promise<Todo>  {
        const userId = req.user._id;
        todoBody.userId = userId;
        const createdTodo = new this.todoModel(todoBody);
        return createdTodo.save();

    }

    /**
     * The function updates a todo item in the database with the provided request and todo body, and
     * returns the updated todo item.
     * @param req - The "req" parameter is an object that represents the HTTP request being made. It
     * typically contains information such as the request method, headers, and body.
     * @param {Todo} todoBody - The `todoBody` parameter is an object that represents the updated todo
     * item. It contains properties such as `id`, `title`, `description`, `completed`, etc.
     * @returns The updated todo object is being returned as a Promise.
     */
    update(req, todoBody: Todo): Promise<Todo> {
        const userId = req.user._id;
        todoBody.userId = userId;
        return this.todoModel.findOneAndUpdate({id: todoBody.id}, todoBody, {new: true});
    }

    /**
     * The delete function deletes a todo item with the specified id from the database.
     * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
     * todo item that needs to be deleted.
     * @returns The deleteOne method of the todoModel is being called with the parameter {id:
     * Number(id)}. The method returns a Promise that resolves to the result of the delete operation.
     */
    async delete(id: number): Promise<any> {
        return await this.todoModel.deleteOne({id: Number(id)});
        // return this.todoModel.find();
    }
}
