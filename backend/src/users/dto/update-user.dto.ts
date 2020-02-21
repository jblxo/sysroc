import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserDto {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field(type => [String], { nullable: true })
  readonly roleSlugs?: string[];
}
