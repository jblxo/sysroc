import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Classification} from './entities/classification.entity';
import {Repository} from 'typeorm';
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
        return this.classificationRepository.findOne({id: filter.id}, {relations: [
                'project',
                'project.user',
                'user'
            ]});
    }

    async getMany(filter: ClassificationsFilter): Promise<ClassificationDto[]> {
        const query = this.classificationRepository.createQueryBuilder('classification')
            .leftJoinAndSelect('classification.project', 'project')
            .leftJoinAndSelect('classification.user', 'user')
            .leftJoinAndSelect('project.user', 'projectUser')
            .andWhere(
                'DATE(classification.createdAt) >= DATE(:fromDate) AND DATE(classification.createdAt) <= DATE(:toDate)',
                {fromDate: filter.fromDate, toDate: filter.toDate})
            .orderBy('classification.createdAt', 'DESC');

        if(filter.projects && filter.projects.length > 0) {
            query.andWhere('project.id IN (:...projectIds)', {projectIds: filter.projects});
        }

        if(filter.users && filter.users.length > 0) {
            query.andWhere('user.id IN (:...userIds)', {userIds: filter.users});
        }

        return query.getMany();
    }

    async deleteOne(filter: ClassificationsFilter): Promise<ClassificationDto> {
        const classification = await this.getOne(filter);

        if(!classification) {
            throw new NotFoundException(`Could not find project for given filter!`);
        }

        const res = await this.classificationRepository.delete({id: filter.id});

        if(!res || res.affected < 1) {
            throw new InternalServerErrorException(`There has been an error deleting project!`);
        }

        return classification;
    }
}
