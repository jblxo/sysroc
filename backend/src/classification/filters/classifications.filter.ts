import {Field, InputType} from 'type-graphql';

@InputType()
export class    ClassificationsFilter {
    @Field({nullable: true})
    id?: number;

    @Field(type => [Number], { nullable: true, defaultValue: [] })
    projects?: number[];

    @Field(type => [Number], { nullable: true, defaultValue: [] })
    users?: number[];
}
