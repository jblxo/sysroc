import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserDto {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}
