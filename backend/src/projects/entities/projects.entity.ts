import { ObjectType, Field, ID } from 'type-graphql';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Task } from '../../tasks/entities/tasks.entity';

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  readonly id: string;

  @Column({nullable: false})
  @Field()
  name: string;

  @Column({nullable: true})
  @Field()
  description: string;

  @ManyToOne(type => User, user => user.projects)
  @Field(type => User)
  user: User;

  @OneToMany(type => Task, task => task.project)
  @Field(type => [Task])
  tasks: Task[];
}
