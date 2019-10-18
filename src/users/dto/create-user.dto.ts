import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserDto {
  @Field()
  readonly username: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  @Field()
  readonly confirmPassword: string;
}
