import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from './config/config.module';
import { ActiveDirectoryModule } from './active-directory/active-directory.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from 'nestjs-redis';

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
    TypegooseModule.forRoot('mongodb://localhost/sysroc', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    RedisModule.register([
      {
        name: 'sysroc.redis.users',
        host: 'localhost',
        port: 6379,
        keyPrefix: 'sysroc',
      },
    ]),
    GroupsModule,
    ConfigModule,
    ActiveDirectoryModule,
    UsersModule,
  ],
})
export class AppModule {}
