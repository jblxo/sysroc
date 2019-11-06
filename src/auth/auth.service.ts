import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async createToken(email: string, userId: string): Promise<string> {
    const user: JwtPayload = { email, sub: userId };
    const token = jwt.sign(user, jwtConstants.secret, {
      expiresIn: jwtConstants.expiresIn,
    });
    return token;
  }

  async validateUser(signedUser): Promise<UserDto> {
    if (signedUser && signedUser.email) {
      return this.userService.findOne({ email: signedUser.email });
    }
    return null;
  }
}
