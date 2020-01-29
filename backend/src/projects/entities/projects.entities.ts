import { ObjectType, Field, ID } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
