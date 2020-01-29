import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormConfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
  ],
})
export class DatabaseModule {}
