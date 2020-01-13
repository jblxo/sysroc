import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../../users/models/users.model';
import { Ref } from '@typegoose/typegoose';
import { TaskDto } from '../../tasks/dto/task.dto';

@ObjectType()
export class ProjectDto {
  @Field(type => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field(type => User, { nullable: true })
  readonly user?: Ref<User>;
  @Field(type => [TaskDto], { defaultValue: [] })
  readonly tasks: Ref<TaskDto>[];
}
