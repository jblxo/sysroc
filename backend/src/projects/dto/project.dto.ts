import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../../users/models/users.model';
import { Ref } from '@typegoose/typegoose';

@ObjectType()
export class ProjectDto {
  @Field(type => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field(type => User, { nullable: true })
  readonly user?: Ref<User>;
}
