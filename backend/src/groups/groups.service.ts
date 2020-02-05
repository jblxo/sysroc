import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/groups.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>) {}

  async createMany(groups: CreateGroupDto[]): Promise<Group[]> {
    return Promise.all(
      groups.map(async (group: Group) => {
        const filter = { name: group.name };
        const foundGroup = await this.groupRepository.findOne(filter);
        if (!foundGroup) {
          return await this.groupRepository.save(
            this.groupRepository.create({
              name: group.name,
            }),
          );
        }
        return foundGroup;
      }),
    );
  }
}
