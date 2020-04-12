import {BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ID, ObjectType} from 'type-graphql';
import {Project} from '../../projects/entities/projects.entity';
import {User} from '../../users/entities/users.entity';

@Entity()
@ObjectType()
export class Classification {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    readonly id: number;

    @Column({nullable: false})
    @Field()
    mark: number;

    @Column({nullable: true})
    @Field()
    note: string;

    @CreateDateColumn({type: 'timestamp with time zone', name: 'created_at'})
    @Field(type => Date)
    createdAt: Date;

    @Column({nullable: false, type: 'int'})
    projectId: number;

    @ManyToOne(type => Project, project => project.classifications)
    @JoinColumn({name: 'projectId'})
    @Field(type => Project)
    project: Project;

    @ManyToOne(type => User, user => user.classifications)
    @JoinColumn({name: 'userId'})
    @Field(type => User)
    user: User;

    @BeforeInsert()
    updateDateCreation() {
        this.createdAt = new Date();
    }
}
