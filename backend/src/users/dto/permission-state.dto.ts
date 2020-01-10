import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PermissionStateDto {
  @Field()
  readonly slug: string;
  @Field()
  readonly permitted: boolean;
}
