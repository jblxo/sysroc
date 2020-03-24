import { Module } from '@nestjs/common';
import { ClassificationResolver } from './classification.resolver';
import { ClassificationService } from './classification.service';

@Module({
  providers: [ClassificationResolver, ClassificationService]
})
export class ClassificationModule {}
