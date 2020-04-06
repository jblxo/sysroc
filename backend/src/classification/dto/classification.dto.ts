import {Field, ObjectType} from 'type-graphql';
import {ProjectDto} from '../../projects/dto/project.dto';
import {UserDto} from '../../users/dto/user.dto';

@ObjectType()
export class ClassificationDto {
    @Field()
    readonly id: number;

    @Field()
    readonly mark: number;

    @Field()
    readonly note: string;

    @Field(type => Date)
    readonly createdAt: Date;

    @Field(type => ProjectDto)
    readonly project: ProjectDto;

    @Field(type => UserDto)
    readonly user: UserDto;
}
