import {Field, InputType} from 'type-graphql';

@InputType()
export class UpdateClassificationDto {
    @Field()
    readonly mark?: number;

    @Field()
    readonly note?: string;

    @Field(type => Number, { nullable: true })
    readonly projectId?: number;
}
