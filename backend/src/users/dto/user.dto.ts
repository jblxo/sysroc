import { Field, ObjectType, ID } from 'type-graphql';
import { Group } from '../../groups/models/groups.model';
import { Ref } from '@typegoose/typegoose';

@ObjectType()
export class UserDto {
  @Field(type => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password?: string;
  @Field(type => [Group], { nullable: true })
  readonly groups?: Ref<Group>[];
}