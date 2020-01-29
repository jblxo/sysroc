import { Field, ID, ObjectType } from 'type-graphql';
import { UserDto } from '../../users/dto/user.dto';
import { TaskDto } from '../../tasks/dto/task.dto';

@ObjectType()
export class ProjectDto {
  @Field(type => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field(type => UserDto)
  readonly user: UserDto;
  @Field(type => [TaskDto], {defaultValue: []})
  readonly tasks: TaskDto[];
}
