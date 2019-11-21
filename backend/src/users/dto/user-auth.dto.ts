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
  @Field({ nullable: true })
  readonly accessToken: string;
  @Field({ nullable: true })
  readonly user: UserDto;
  @Field({ nullable: true })
  readonly registerToken: string;
}
