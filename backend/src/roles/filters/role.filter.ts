import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class RolesFilter {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  admin?: boolean;

  @Field({ nullable: true })
  permission?: string;

  @Field({ nullable: true })
  user?: string;
}
