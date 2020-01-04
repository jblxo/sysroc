import { Module } from '@nestjs/common';
import { PermissionsResolver } from './permissions.resolver';
import { PermissionsService } from './permissions.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Permission } from './models/permissions.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{ typegooseClass: Permission, schemaOptions: {} }]),
  ],
  providers: [PermissionsResolver, PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
