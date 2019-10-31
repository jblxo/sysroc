import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Group } from './models/groups.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private readonly groupModel: ReturnModelType<typeof Group>,
  ) {}

  async createMany(groups: Group[]): Promise<DocumentType<Group>[]> {
    return Promise.all(
      groups.map(async (group: Group) => {
        const newGroup = new this.groupModel(group);
        const createdGroup = await newGroup.save();
        return createdGroup;
      }),
    );
  }
}
