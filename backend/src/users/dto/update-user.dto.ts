import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserDto {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field(type => [String], { nullable: true })
  readonly roleSlugs?: string[];

  @Field(type => [Number], { nullable: true })
  readonly groups?: number[];
}
