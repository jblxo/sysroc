import { prop as Property } from '@typegoose/typegoose';
import { Field } from 'type-graphql';
import * as validator from 'validator';

export class User {
  @Field()
  @Property({ required: true, unique: true, trim: true })
  username: string;

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
  })
  email: string;
}
