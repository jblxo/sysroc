import { Field, InputType } from 'type-graphql';

@InputType()
export class UserAuthInputDto {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}
