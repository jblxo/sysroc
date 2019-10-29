import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypegooseModule.forRoot('mongodb://localhost/sysroc', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    UsersModule,
    GroupsModule,
  ],
})
export class AppModule {}
