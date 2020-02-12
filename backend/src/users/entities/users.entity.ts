import { Field, ID, ObjectType } from 'type-graphql';
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Role } from '../../roles/entities/roles.entity';
import { Group } from '../../groups/entities/groups.entity';
import { options } from 'tsconfig-paths/lib/options';
import {Project} from "../../projects/entities/projects.entity";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  readonly id: number;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Column({ nullable: false })
  @Field()
  password: string;

  @Column({ nullable: false, unique: true })
  @Field()
  email: string;

  @Column({ nullable: false, unique: true })
  @Field()
  adEmail: string;

  @ManyToMany(type => Role, role => role.users, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable()
  @Field(type => [Role])
  roles: Role[];

  @ManyToMany(type => Group, group => group.users, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinTable()
  @Field(type => [Group])
  groups: Group[];

  @OneToMany(type => Project, project => project.user)
  @Field(type => [Project])
  projects: Project[];
}
