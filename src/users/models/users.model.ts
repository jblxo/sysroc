import {
  prop as Property,
  arrayProp as ArrayProperty,
  Ref,
} from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import * as validator from 'validator';
import { Group } from '../../groups/models/groups.model';

@ObjectType()
export class User {
  @Field()
  @Property({ required: true, trim: true })
  name: string;

  @Field()
  @Property({ required: true })
  password: string;

  @Field()
  @Property({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: value => validator.isEmail(value),
    message: `{VALUE} is not valid email`,
  })
  email: string;

  @Field(type => [Group], { nullable: true })
  @ArrayProperty({ itemsRef: 'Group', default: undefined })
  groups?: Ref<Group>[];
}
