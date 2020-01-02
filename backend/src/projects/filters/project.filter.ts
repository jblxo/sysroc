import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ProjectsFilter {
  @Field({ nullable: true })
  _id?: String;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  user?: string;
}
