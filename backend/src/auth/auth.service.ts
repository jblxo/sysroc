import { forwardRef, Inject, Injectable } from '@nestjs/common';
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

  async createToken(email: string, userId: number): Promise<string> {
    const user: JwtPayload = { email, sub: userId };
    return jwt.sign(user, jwtConstants.accessSecret, {
      expiresIn: jwtConstants.expiresIn,
    });
  }

  async createRefreshToken(email: string, userId: number): Promise<string> {
    const user: JwtPayload = { email, sub: userId };
    return jwt.sign(user, jwtConstants.refreshSecret, {
      expiresIn: '7d',
    });
  }

  async validateUser(signedUser): Promise<UserDto> {
    if (signedUser && signedUser.email) {
      return this.userService.findOne({ email: signedUser.email });
    }
    return null;
  }
}
