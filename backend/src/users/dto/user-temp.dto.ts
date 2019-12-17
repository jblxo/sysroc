import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserTempDto {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;
}
