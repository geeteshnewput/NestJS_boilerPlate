import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
      ) {}
    /**
     * The function signIn takes a username and password as parameters, checks if the password matches
     * the user's password, and returns an access token if the authentication is successful.
     * @param {string} username - A string representing the username of the user trying to sign in.
     * @param {string} password - The `password` parameter is a string that represents the password
     * provided by the user during the sign-in process.
     * @returns an object with an access_token property. The value of the access_token property is the
     * result of calling the signAsync method of the jwtService with the payload as an argument.
     */
    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== password) {
        throw new UnauthorizedException();
        }
        const payload = { username: user.username, _id: user.id ,sub: user.userId };
        return {
        access_token: await this.jwtService.signAsync(payload),
        };
    }
}
