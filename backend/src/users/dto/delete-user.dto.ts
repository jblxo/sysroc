import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteUserDto {
  @Field()
  readonly email: string;
}
