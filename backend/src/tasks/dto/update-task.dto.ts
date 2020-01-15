import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateTaskDto {
  @Field({ nullable: true })
  readonly name?: string;
  @Field({ nullable: true })
  readonly description?: string;
  @Field({ nullable: true })
  readonly dueDate?: Date;
}
