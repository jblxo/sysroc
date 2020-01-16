import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserDto {
  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly adEmail?: string;

  @Field()
  readonly email: string;

  @Field({ nullable: true })
  readonly password?: string;

  @Field(type => [String], { nullable: true })
  readonly roleSlugs?: string[];
}
