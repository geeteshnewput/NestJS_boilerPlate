import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}

    /**
     * The `findOne` function in TypeScript returns a promise that resolves to the first user object
     * found in the database based on the provided username.
     * @param {string} username - A string representing the username of the user you want to find.
     * @returns The findOne function is returning a Promise that resolves to an object of type 'any'.
     */
    async findOne(username: string): Promise<any> {
        return this.UserModel.findOne({username});
      }

    /**
     * The function creates a new user and saves it to the database.
     * @param {User} body - The `body` parameter is an object of type `User` that contains the data
     * needed to create a new user.
     * @returns a Promise that resolves to a User object.
     */
    async create(body: User): Promise<User> {
        const createdUser = new this.UserModel(body);
        return createdUser.save();
    }
}
