import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RegisterUserDto {
  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly email?: string;

  @Field()
  readonly adEmail: string;

  @Field()
  readonly password: string;

  @Field()
  readonly dn: string;

  @Field(type => [String], { nullable: true })
  readonly roleSlugs?: string[];
}
