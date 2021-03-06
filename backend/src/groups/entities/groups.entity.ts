import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity()
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  readonly id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(type => User, user => user.groups)
  @Field(type => [User])
  users: User[];
}
