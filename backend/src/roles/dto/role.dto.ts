import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../../users/models/users.model';
import { Ref } from '@typegoose/typegoose';
import { Permission } from '../../permissions/models/permissions.model';

@ObjectType()
export class RoleDto {
  @Field(type => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly admin: boolean;
  @Field(type => [User], { nullable: true })
  readonly users?: Ref<User>[];
  @Field(type => [Permission], { nullable: true })
  readonly permissions?: Ref<Permission>[];
}
