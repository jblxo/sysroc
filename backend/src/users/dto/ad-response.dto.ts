import { ObjectType, Field } from 'type-graphql';
import { ADUser } from '../../active-directory/models/ad-user.model';

@ObjectType()
export class ADResponseDto {
  @Field()
  readonly exists: boolean;

  @Field(type => ADUser)
  readonly user: ADUser;
}
