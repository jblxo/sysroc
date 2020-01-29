import { Field, ID, ObjectType } from 'type-graphql';
import { PermissionDto } from '../../permissions/dto/permission.dto';

@ObjectType()
export class RoleDto {
  @Field(type => ID)
  readonly id: number;

  @Field()
  readonly name: string;

  @Field()
  readonly slug: string;

  @Field()
  readonly admin: boolean;

  @Field(type => [PermissionDto])
  readonly permissions: PermissionDto[];
}
