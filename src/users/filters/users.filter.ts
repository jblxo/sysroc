import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UsersFilter {
  @Field({ nullable: true })
  _id?: String;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;
}
