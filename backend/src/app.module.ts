import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from './config/config.module';
import { ActiveDirectoryModule } from './active-directory/active-directory.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      cors: {
        origin: 'http://localhost:3001',
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
    GroupsModule,
    ConfigModule,
    ActiveDirectoryModule,
    UsersModule,
  ],
})
export class AppModule {}
