import { Field, ID, ObjectType } from 'type-graphql';
import { Group } from '../../groups/entities/groups.entity';
import { RoleDto } from '../../roles/dto/role.dto';

@ObjectType()
export class UserDto {
  @Field(type => ID)
  readonly id: number;
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly adEmail: string;
  @Field()
  readonly password?: string;
  @Field(type => [Group])
  readonly groups: Group[];
  @Field(type => [RoleDto])
  readonly roles: RoleDto[];
}
