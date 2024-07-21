import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  rateLimit: number;

  @Column()
  expiresAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
