import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePermissionDto {
  @Field({ nullable: true })
  readonly name?: string;

  @Field()
  readonly slug: string;
}
