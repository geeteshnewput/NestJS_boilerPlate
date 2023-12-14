import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
//   import { jwtConstants } from './constants';
  import { IS_PUBLIC_KEY } from '../decorators/public.decorators';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        // 💡 See this condition
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: 'jwtConstants.secret',
        });
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch (error) {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    /**
     * The function extracts a token from the authorization header of a request if it is of type
     * "Bearer".
     * @param {Request} request - The `request` parameter is an object that represents an HTTP request.
     * It typically contains information such as the request headers, body, and other metadata. In this
     * case, the `request` object is expected to have a `headers` property, which is an object
     * representing the request headers.
     * @returns a string value if the type of authorization is 'Bearer', otherwise it returns
     * undefined.
     */
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }