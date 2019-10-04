import { Field, Int, InputType, ID } from 'type-graphql';

@InputType()
export class CreateCatDto {
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly breed: string;
}
