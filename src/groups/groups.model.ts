import {
  prop as Property,
  arrayProp as ArrayProperty,
  Ref,
} from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { User } from '../users/users.model';

@ObjectType()
export class Group {
  @Field()
  @Property()
  name: string;

  @Field(type => [User], { nullable: true })
  @ArrayProperty({ itemsRef: 'User', default: [] })
  users?: Ref<User>[];
}
