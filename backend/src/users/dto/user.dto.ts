import { Field, ID, ObjectType } from 'type-graphql';
import { Group } from '../../groups/models/groups.model';
import { Ref } from '@typegoose/typegoose';
import { Role } from '../../roles/models/roles.model';

@ObjectType()
export class UserDto {
  @Field(type => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly adEmail: string;
  @Field()
  readonly password?: string;
  @Field(type => [Group], { nullable: true })
  readonly groups?: Ref<Group>[];
  @Field(type => [Role], { nullable: true })
  readonly roles?: Ref<Role>[];
}
