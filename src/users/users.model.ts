import { prop as Property } from '@typegoose/typegoose';
import { IsString, IsEmail } from 'class-validator';

export class User {
  @IsString()
  @Property({ required: true })
  username: string;

  @IsString()
  @Property({ required: true })
  password: string;

  @IsEmail()
  @Property({ required: true })
  email: string;
}
