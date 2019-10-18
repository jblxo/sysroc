import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
}
