import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorators';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    /* The code snippet is defining a method called `signIn` inside the `AuthController` class. This
    method is decorated with `@Public()` and `@Post()` decorators. */
    @Public()
    @Post()
    signIn(@Body() signInDto: any): Promise<any> {
        console.log(signInDto);
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
