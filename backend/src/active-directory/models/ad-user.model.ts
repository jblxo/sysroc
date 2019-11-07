import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class ADUser {
  @Field()
  readonly dn: string;

  @Field()
  readonly userPrincipalName: string;

  @Field()
  readonly cn: string;
}
