import { arrayProp as ArrayProperty, prop as Property, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { Role } from '../../roles/models/roles.model';

@ObjectType()
export class Permission {
  @Field(type => ID)
  readonly _id: string;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  slug: string;

  @Field(type => [Role], { nullable: true })
  @ArrayProperty({ itemsRef: 'Role', default: undefined })
  roles?: Ref<Role>[];
}
