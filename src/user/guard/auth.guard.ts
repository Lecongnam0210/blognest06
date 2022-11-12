import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwtServices from '../../Jwt/Jwt.services'; // singleton

@Injectable()
export class AuthService implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return jwtServices.validateToken(request);
  }
}
