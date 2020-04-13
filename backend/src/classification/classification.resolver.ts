import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ClassificationService} from './classification.service';
import {ClassificationDto} from './dto/classification.dto';
import {CreateClassificationDto} from './dto/create-classification.dto';
import {ClassificationsFilter} from './filters/classifications.filter';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/graphql-auth.guard';
import {HasPermissions} from '../users/decorators/has-permissions.decorator';
import {PERMISSIONS} from '../permissions/permissions';
import {UpdateClassificationDto} from './dto/update-classification.dto';

@Resolver('Classification')
export class ClassificationResolver {
    constructor(private readonly classificationService: ClassificationService) {}

    @Mutation(() => ClassificationDto)
    @UseGuards(GqlAuthGuard)
    @HasPermissions(PERMISSIONS.CLASSIFICATION_MANAGE)
    createClassification(@Args('input') input: CreateClassificationDto): Promise<ClassificationDto> {
        return this.classificationService.createOne(input);
    }

    @Query(() => [ClassificationDto])
    @UseGuards(GqlAuthGuard)
    @HasPermissions(PERMISSIONS.CLASSIFICATION_VIEW)
    classifications(@Args('filter') filter: ClassificationsFilter): Promise<ClassificationDto[]> {
        return this.classificationService.getMany(filter);
    }

    @Mutation(() => ClassificationDto)
    @UseGuards(GqlAuthGuard)
    @HasPermissions(PERMISSIONS.CLASSIFICATION_MANAGE)
    deleteClassification(@Args('filter') filter: ClassificationsFilter): Promise<ClassificationDto> {
        return this.classificationService.deleteOne(filter);
    }

    @Mutation(() => ClassificationDto)
    @UseGuards(GqlAuthGuard)
    @HasPermissions(PERMISSIONS.CLASSIFICATION_MANAGE)
    updateClassification(
        @Args('filter') filter: ClassificationsFilter,
        @Args('updates') updates: UpdateClassificationDto
    ) {
        return this.classificationService.updateOne(filter, updates);
    }
}
