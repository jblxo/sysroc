import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/users.entity';
import { ConfigModule } from '../config/config.module';
import { GroupsModule } from '../groups/groups.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    ConfigModule,
    GroupsModule,
    RolesModule,
    AuthModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit(): Promise<void> {
    await this._seedUsers();
  }

  async _seedUsers(): Promise<void> {
    const adminEmail = 'admin@spsul.cz';

    try {
      await this.usersService.findOne({ email: adminEmail });
      // The admin account is already created, no action has to be performed anymore as
      // we are only catching the error that occurs when the account does not exist
    } catch {
      await this.usersService.create({
        name: 'Super Administrator',
        email: adminEmail,
        password: 'admin123',
        roleSlugs: ['admin'],
      });
    }
  }
}
