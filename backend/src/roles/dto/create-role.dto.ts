import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateRoleDto {
  @Field()
  readonly name: string;

  @Field()
  readonly slug: string;

  @Field({ defaultValue: false })
  readonly admin: boolean;

  @Field({ nullable: true })
  readonly permissionSlugs: string[];
}
