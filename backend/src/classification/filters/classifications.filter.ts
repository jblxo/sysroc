import {Field, InputType} from 'type-graphql';

@InputType()
export class    ClassificationsFilter {
    @Field({nullable: true})
    id?: number;

    @Field({nullable: true})
    project?: number;

    @Field({nullable: true})
    user?: number;
}
