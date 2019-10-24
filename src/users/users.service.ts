import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersFilter } from './filters/users.filter';
import { User } from './users.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(filter: UsersFilter): Promise<UserDto> {
    const user = await this.userModel.findOne(filter).exec();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 1. TODO: Check if user can auth against AD
    const createUser = { ...createUserDto };
    // 2. Lowercase email
    createUser.email = createUserDto.email.toLowerCase();
    // 3. Check if the passwords match
    if (createUser.password !== createUser.confirmPassword)
      throw new Error(`The password don't match!`);

    delete createUser.confirmPassword;

    // 4. Check if username and email are unique
    const { username, email } = createUserDto;
    const isUser = await this.userModel
      .findOne({ $or: [{ username }, { email }] })
      .exec();
    if (isUser !== null)
      throw new Error('User with given email or username already exists!');
    // 5. Hash the password
    createUser.password = await bcrypt.hash(createUserDto.password, 10);
    // 6. Create user
    const createdUser = new this.userModel(createUser);
    // 7. TODO: Sign in the user
    return await createdUser.save();
  }
}
