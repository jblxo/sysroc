import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class PermissionDto {
  @Field(type => ID)
  readonly id: number;
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
}
