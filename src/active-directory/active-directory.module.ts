import { Module, HttpModule } from '@nestjs/common';
import { ActiveDirectoryResolver } from './active-directory.resolver';
import { ActiveDirectoryService } from './active-directory.service';
import { ConfigModule } from '../config/config.module';

@Module({
  providers: [ActiveDirectoryResolver, ActiveDirectoryService],
  imports: [HttpModule, ConfigModule],
})
export class ActiveDirectoryModule {}
