import { Field, ID, ObjectType } from 'type-graphql';
import { ProjectDto } from '../../projects/dto/project.dto';

@ObjectType()
export class TaskDto {
  @Field()
  readonly id: number;

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

  @Field(type => ProjectDto)
  readonly project: ProjectDto;
}
