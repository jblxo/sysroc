import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTaskDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => Date)
  dueDate: Date;

  @Field(type => Boolean, { nullable: true })
  completed?: boolean;

  @Field({ nullable: false })
  project: string;
}
