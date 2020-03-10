import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateGroupDto {
  @Field()
  readonly name: string;
}
