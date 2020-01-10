import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserRawDto {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field({ nullable: true })
  readonly roleSlugs?: string[];
}
