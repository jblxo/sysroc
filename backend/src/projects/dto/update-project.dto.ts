import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateProjectDto {
  @Field({ nullable: true })
  readonly name?: string;
  @Field({ nullable: true })
  readonly description?: string;
}
