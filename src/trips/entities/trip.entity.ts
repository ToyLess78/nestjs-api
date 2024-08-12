import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  level: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
