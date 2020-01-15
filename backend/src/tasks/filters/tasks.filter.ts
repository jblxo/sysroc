import { Field, InputType } from 'type-graphql';

@InputType()
export class TasksFilter {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  name?: string;
}
