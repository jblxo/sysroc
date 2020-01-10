import { ObjectType, Field } from 'type-graphql';
import { prop as Property, Ref } from '@typegoose/typegoose';
import { User } from '../../users/models/users.model';

@ObjectType()
export class Project {
  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  @Property({ required: false, default: '' })
  description: string;

  @Field(type => User, { nullable: false })
  @Property({ ref: 'User', default: undefined })
  user: Ref<User>;
}
