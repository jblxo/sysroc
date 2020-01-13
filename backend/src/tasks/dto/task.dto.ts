import { Field, ID, ObjectType } from 'type-graphql';
import { Project } from '../../projects/models/projects.model';
import { Ref } from '@typegoose/typegoose';

@ObjectType()
export class TaskDto {
  @Field(type => ID)
  readonly _id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly description?: string;

  @Field(type => Date)
  readonly dueDate: Date;

  @Field(type => Date)
  readonly createdAt: Date;

  @Field(type => Boolean)
  readonly completed: boolean;

  @Field(type => Project, { nullable: false })
  readonly project: Ref<Project>;
}
