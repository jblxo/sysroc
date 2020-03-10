import { Field, InputType } from 'type-graphql';

@InputType()
export class ProjectsFilter {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  user?: string;
}
