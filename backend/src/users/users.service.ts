import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersFilter } from './filters/users.filter';
import { User } from './models/users.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserDto } from './dto/user.dto';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';
import { ADResponse } from '../active-directory/models/ad-response.model';
import { Group } from '../groups/models/groups.model';
import { GroupsService } from '../groups/groups.service';
import { UserAuthInputDto } from './dto/user-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ObjectId } from 'bson';

@Injectable()
export class UsersService {
  private ADEndpoint: string;

  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Group)
    private readonly groupModel: ReturnModelType<typeof Group>,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly groupsService: GroupsService,
  ) {
    this.ADEndpoint = config.get('AD_ENDPOINT');
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userModel.find().exec();
  }

  async findOne(filter: UsersFilter): Promise<UserDto | undefined> {
    const user = await this.userModel
      .findOne(filter)
      .populate('groups')
      .exec();

    if (!user) {
      throw new Error(`User not found!`);
    }

    await this.userModel.populate(user, {
      path: 'groups.users',
    });

    return user;
  }

  getADUser(
    authInputDto: UserAuthInputDto,
  ): Observable<AxiosResponse<ADResponse>> {
    const { email: username, password } = authInputDto;

    return this.httpService.post(`${this.ADEndpoint}/auth/login`, {
      username,
      password,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let response: ADResponse = null;
    await this.getADUser(createUserDto).subscribe(res => (response = res.data));

    const password = await this.hashPassword(createUserDto.password);

    return this.register({
      name: response.user.cn,
      email: createUserDto.email,
      adEmail: createUserDto.email,
      password,
      dn: response.user.dn,
    });
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const groups: Group[] = registerUserDto.dn
      .split(',')
      .map(val => ({ name: val.substring(val.indexOf('=') + 1) }));

    const createdGroups = await this.groupsService.createMany(groups);

    const createUser = {
      email: registerUserDto.email,
      adEmail: registerUserDto.adEmail,
      password: registerUserDto.password,
      name: registerUserDto.name,
      groups: [],
    };

    createdGroups.forEach(group => {
      createUser.groups.push(group._id);
    });

    const createdUser = new this.userModel(createUser);
    const newUser = await createdUser.save();

    for (const group of createdGroups) {
      group.users.push(newUser._id);
      await group.save();
    }

    return await newUser.populate('groups').execPopulate();
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async delete(userId: string): Promise<boolean> {
    await this.groupModel
      .updateMany(
        { users: userId },
        { $pull: { users: userId } },
        (err, raw) => {
          if (err) throw new Error(err);
          console.log(raw);
        },
      )
      .exec();
    return !!this.userModel.deleteOne({ _id: userId }).exec();
  }
}
