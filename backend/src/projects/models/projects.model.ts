import { ObjectType, Field, ID } from 'type-graphql';
import {
  prop as Property,
  arrayProp as ArrayProperty,
  Ref,
} from '@typegoose/typegoose';
import { User } from '../../users/models/users.model';
import { Task } from '../../tasks/models/tasks.model';

@ObjectType()
export class Project {
  @Field(type => ID)
  readonly _id: string;

  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  @Property({ required: false, default: '' })
  description: string;

  @Field(type => User, { nullable: false })
  @Property({ ref: 'User', default: undefined })
  user: Ref<User>;

  @Field(type => [Task], { nullable: false })
  @ArrayProperty({ itemsRef: 'Task', default: [] })
  tasks: Ref<Task>[];
}
