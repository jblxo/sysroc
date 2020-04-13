import { Field, ID, ObjectType } from 'type-graphql';
import { UserDto } from '../../users/dto/user.dto';
import { TaskDto } from '../../tasks/dto/task.dto';
import { ClassificationDto } from '../../classification/dto/classification.dto';

@ObjectType()
export class ProjectDto {
  @Field(type => ID)
  readonly id: number;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field(type => UserDto)
  readonly user: UserDto;

  @Field(type => UserDto, { nullable: true })
  readonly supervisor?: UserDto;

  @Field(type => [TaskDto], { defaultValue: [] })
  readonly tasks: TaskDto[];

  @Field(type => [ClassificationDto], { defaultValue: [] })
  readonly classifications: ClassificationDto[];

  @Field(type => Date)
  readonly createdAt: Date;
}
