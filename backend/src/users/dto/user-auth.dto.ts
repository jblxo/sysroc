import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class UserAuthInputDto {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}

@ObjectType()
export class UserAuthDto {
  @Field()
  readonly email: string;
  @Field()
  readonly access_token: string;
}
