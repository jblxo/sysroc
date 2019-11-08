import { Controller, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/refresh_token')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<any> {
    const token = req.cookies.token;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, jwtConstants.refreshSecret!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await this.usersService.findOne({ _id: payload.sub });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    const refresh = await this.authService.createRefreshToken(
      user.email,
      user._id,
    );

    const access = await this.authService.createToken(user.email, user._id);

    res.cookie('token', refresh, {
      httpOnly: true,
      path: jwtConstants.refreshPath,
    });

    res.send({ ok: true, accessToken: access });
  }
}
