import { Field, InputType } from 'type-graphql';

@InputType()
export class ClassificationsFilter {
  @Field({ nullable: true })
  id?: number;

  @Field(type => [Number], { nullable: true, defaultValue: [] })
  projects?: number[];

  @Field(type => [Number], { nullable: true, defaultValue: [] })
  users?: number[];

  @Field(type => Date, { nullable: true, defaultValue: new Date(new Date().setMonth(new Date().getMonth() - 1)) })
  fromDate?: Date;

  @Field(type => Date, { nullable: true, defaultValue: new Date() })
  toDate?: Date;
}
