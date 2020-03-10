import { Field, InputType } from 'type-graphql';

@InputType()
export class TasksFilter {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;
}
