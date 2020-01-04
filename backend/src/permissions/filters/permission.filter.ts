import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class PermissionsFilter {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  role?: string;
}
