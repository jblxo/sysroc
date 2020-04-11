import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ClassificationService} from './classification.service';
import {ClassificationDto} from './dto/classification.dto';
import {CreateClassificationDto} from './dto/create-classification.dto';
import {ClassificationsFilter} from './filters/classifications.filter';

@Resolver('Classification')
export class ClassificationResolver {
    constructor(private readonly classificationService: ClassificationService) {}

    @Mutation(() => ClassificationDto)
    createClassification(@Args('input') input: CreateClassificationDto): Promise<ClassificationDto> {
        return this.classificationService.createOne(input);
    }

    @Query(() => [ClassificationDto])
    classifications(@Args('filter') filter: ClassificationsFilter): Promise<ClassificationDto[]> {
        return this.classificationService.getMany(filter);
    }

    @Mutation(() => ClassificationDto)
    deleteClassification(@Args('filter') filter: ClassificationsFilter): Promise<ClassificationDto> {
        return this.classificationService.deleteOne(filter);
    }
}
