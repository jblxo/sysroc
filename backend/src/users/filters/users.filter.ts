import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UsersFilter {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  adEmail?: string;

  @Field({ nullable: true })
  name?: string;
}
