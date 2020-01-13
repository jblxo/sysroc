import { prop as Property, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { Project } from '../../projects/models/projects.model';

@ObjectType()
export class Task {
  @Field(type => ID)
  readonly _id: string;

  @Field()
  @Property({ required: true, trim: true })
  name: string;

  @Field()
  @Property({ required: false, default: '' })
  description?: string;

  @Field(type => Date)
  @Property({ required: true })
  dueDate: Date;

  @Field(type => Date)
  @Property({ required: true, default: Date.now() })
  createdAt: Date;

  @Field(type => Boolean)
  @Property({ required: true, default: false })
  completed: boolean;

  @Field(type => Project, { nullable: false })
  @Property({ ref: 'Project' })
  project: Ref<Project>;
}
