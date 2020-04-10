import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Classification} from './entities/classification.entity';
import {In, Repository} from 'typeorm';
import {CreateClassificationDto} from './dto/create-classification.dto';
import {ClassificationDto} from './dto/classification.dto';
import {Project} from '../projects/entities/projects.entity';
import {User} from '../users/entities/users.entity';
import {ClassificationsFilter} from './filters/classifications.filter';

@Injectable()
export class ClassificationService {
    constructor(
        @InjectRepository(Classification) private readonly classificationRepository: Repository<Classification>,
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async createOne(createClassificationDto: CreateClassificationDto): Promise<ClassificationDto> {
        const newClassification = this.classificationRepository.create({
            ...createClassificationDto,
            project: null,
            user: null
        });
        newClassification.project = await this.projectRepository.findOne(
            createClassificationDto.project,
            {relations: ['tasks']}
        );
        newClassification.user = await this.userRepository.findOne(
            createClassificationDto.user,
            {relations: ['projects']}
        );
        await this.classificationRepository.save(newClassification);
        return newClassification;
    }

    async getOne(filter: ClassificationsFilter): Promise<ClassificationDto> {
        return this.classificationRepository.findOne({id: filter.id});
    }

    async getMany(filter: ClassificationsFilter): Promise<ClassificationDto[]> {
        const query = this.classificationRepository.createQueryBuilder('classification')
            .leftJoinAndSelect('classification.project', 'project')
            .leftJoinAndSelect('classification.user', 'user')
            .leftJoinAndSelect('project.user', 'projectUser');

        if(filter.projects && filter.projects.length > 0) {
            query.orWhere('project.id IN (:...projectIds)', {projectIds: filter.projects});
        }

        if(filter.users && filter.users.length > 0) {
            query.orWhere('user.id IN (:...userIds)', {userIds: filter.users});
        }

        return query.getMany();
    }
}
