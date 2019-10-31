import { Injectable, HttpService } from '@nestjs/common';
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

@Injectable()
export class UsersService {
  private ADEndpoint: string;

  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
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

  async findOne(filter: UsersFilter): Promise<UserDto> {
    const user = await this.userModel
      .findOne(filter)
      .populate('groups')
      .exec();

    if (!user) throw new Error(`User not found!`);

    await this.userModel.populate(user, {
      path: 'groups.users',
    });

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email: username, password } = createUserDto;
    const ADResponse: ADResponse = await this.httpService
      .post(this.ADEndpoint, {
        username,
        password,
      })
      .pipe(map(response => response.data))
      .toPromise();

    const groups: Group[] = ADResponse.user.dn
      .split(',')
      .map(val => ({ name: val.substring(val.indexOf('=') + 1) }));

    const createdGroups = await this.groupsService.createMany(groups);

    const createUser = {
      ...createUserDto,
      name: ADResponse.user.cn,
      groups: [],
    };

    createdGroups.forEach(group => {
      createUser.groups.push(group._id);
    });

    createUser.password = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel(createUser);
    const newUser = await createdUser.save();

    createdGroups.forEach(async group => {
      group.users.push(newUser._id);
      await group.save();
    });

    return await newUser.populate('groups').execPopulate();
  }
}
