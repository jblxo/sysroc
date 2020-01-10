import { Field, ID, ObjectType } from 'type-graphql';
import { Ref } from '@typegoose/typegoose';
import { Role } from '../../roles/models/roles.model';

@ObjectType()
export class PermissionDto {
  @Field(type => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
  @Field(type => [Role], { nullable: true })
  readonly roles?: Ref<Role>[];
}
