import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { Public } from '../decorators/public.decorators';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


@Public()
@Post("register")
postUser(@Body() userBody: User ): Promise<User> {
    return this.userService.create(userBody);
}
}
