import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from './config/config.module';
import { ActiveDirectoryModule } from './active-directory/active-directory.module';
import { UsersModule } from './users/users.module';
import { RedisModule, RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { redisConstants } from './redis/constants';
import { ProjectsModule } from './projects/projects.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      cors: {
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: true,
        optionsSuccessStatus: 204,
        credentials: true,
      },
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    TypegooseModule.forRoot('mongodb://localhost/mongodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    RedisModule.register([
      {
        name: redisConstants.name,
        host: 'localhost',
        port: 6379,
        keyPrefix: redisConstants.keyPrefix,
      },
    ]),
    GroupsModule,
    ConfigModule,
    PermissionsModule,
    ActiveDirectoryModule,
    UsersModule,
    ProjectsModule,
  ],
})
export class AppModule {
  private redisClient: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient(redisConstants.name);
  }

  async onModuleInit(): Promise<void> {
    await this.redisClient.flushdb();
  }
}
