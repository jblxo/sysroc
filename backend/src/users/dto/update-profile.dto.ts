import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateProfileDto {
  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly email?: string;

  @Field({ nullable: true })
  readonly oldPassword?: string;

  @Field({ nullable: true })
  readonly password?: string;

  @Field({ nullable: true })
  readonly passwordAgain?: string;
}
