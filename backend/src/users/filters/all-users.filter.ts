import { Field, InputType } from 'type-graphql';

@InputType()
export class AllUsersFilter {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  adEmail?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(type => [Number], { nullable: true })
  roles?: number[];

  @Field(type => [Number], { nullable: true })
  groups?: number[];
}
