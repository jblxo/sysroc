import { Field, InputType, ObjectType } from 'type-graphql';
import { UserDto } from './user.dto';
import { UserTempDto } from './user-temp.dto';
import { PermissionStateDto } from './permission-state.dto';

@InputType()
export class UserAuthInputDto {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}

@ObjectType()
export class UserAuthDto {
  @Field({ nullable: true })
  readonly accessToken: string;
  @Field({ nullable: true })
  readonly user: UserDto;
  @Field(type => [PermissionStateDto], { nullable: true })
  readonly permissions: PermissionStateDto[];
  // Fields that are used when the user is not registered
  @Field({ nullable: true })
  readonly userTemp: UserTempDto;
  @Field({ nullable: true })
  readonly registerToken: string;
}
