import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class CatDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly breed: string;
}
