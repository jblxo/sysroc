import { arrayProp as ArrayProperty, prop as Property, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../../users/models/users.model';
import { Permission } from '../../permissions/models/permissions.model';

@ObjectType()
export class Role {
  @Field(type => ID)
  readonly _id: string;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property({ default: false })
  admin: boolean;

  @Field(type => [Permission], { nullable: true })
  @ArrayProperty({ itemsRef: 'Permission', default: undefined })
  permissions?: Ref<Permission>[];

  @Field(type => [User], { nullable: true })
  @ArrayProperty({ itemsRef: 'User', default: undefined })
  users?: Ref<User>[];
}
