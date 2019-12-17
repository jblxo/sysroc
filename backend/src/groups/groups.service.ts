import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Group } from './models/groups.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { GroupsModule } from './groups.module';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group)
    private readonly groupModel: ReturnModelType<typeof Group>,
  ) {}

  async createMany(groups: Group[]): Promise<DocumentType<Group>[]> {
    return Promise.all(
      groups.map(async (group: Group) => {
        const filter = { name: group.name };
        const foundGroup = await this.groupModel.findOne(filter);
        if (!foundGroup) {
          return await this.groupModel.create({
            name: group.name,
            users: [],
          });
        }
      }),
    );
  }
}
