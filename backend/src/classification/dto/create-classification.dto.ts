import {Field, InputType} from 'type-graphql';

@InputType()
export class CreateClassificationDto {
    @Field({nullable: false})
    mark: number;

    @Field({nullable: false})
    project: number;

    @Field({nullable: false})
    user: number;
}
