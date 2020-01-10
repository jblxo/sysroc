import {
  arrayProp as ArrayProperty,
  prop as Property,
  Ref,
} from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import * as validator from 'validator';
import { Group } from '../../groups/models/groups.model';
import { Project } from '../../projects/models/projects.model';

@ObjectType()
export class User {
  @Field(type => ID)
  readonly _id: string;

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

  @Field()
  @Property({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: value => validator.isEmail(value),
    message: `{VALUE} is not valid email`,
  })
  adEmail: string;

  @Field(type => [Group], { nullable: true })
  @ArrayProperty({ itemsRef: 'Group', default: [] })
  groups?: Ref<Group>[];

  @Field(type => [Project], { nullable: true })
  @ArrayProperty({ itemsRef: 'Project', default: [] })
  projects?: Ref<Project>[];
}
