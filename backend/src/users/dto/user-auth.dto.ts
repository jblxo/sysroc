import { Field, InputType, ObjectType } from 'type-graphql';
import { UserDto } from './user.dto';

@InputType()
export class UserAuthInputDto {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}

@ObjectType()
export class UserAuthDto {
  @Field()
  readonly accessToken: string;
  @Field()
  readonly user: UserDto;
}
