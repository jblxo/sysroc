import { Module } from '@nestjs/common';
import { PermissionsResolver } from './permissions.resolver';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsResolver, PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
