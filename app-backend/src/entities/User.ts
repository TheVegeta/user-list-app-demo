import { nanoid } from "nanoid";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Column({ length: 8, primary: true })
  id!: string;

  @Column({ unique: true })
  custId!: string;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  mobile!: string;

  @Field()
  @Column()
  hash!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  age!: number;

  @Field()
  @Column()
  registerDate!: string;

  @Field()
  @Column({ default: false })
  isForLogin!: boolean;

  @Field()
  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @BeforeInsert()
  setId() {
    this.id = nanoid(8);
  }
}
