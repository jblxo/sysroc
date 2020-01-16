import { Field, InputType } from 'type-graphql';

@InputType()
export class RolesFilter {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  admin?: boolean;

  @Field({ nullable: true })
  permission?: string;

  @Field({ nullable: true })
  user?: string;
}
