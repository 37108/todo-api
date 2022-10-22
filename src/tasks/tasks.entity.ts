import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  status?: string;

  @Column({ nullable: true })
  deadline?: Date | null;

  @Column({ nullable: true })
  completedAt?: Date | null;

  @Column()
  workingHours?: number;

  // todo: sql.js does not support these column. use other logic
  // @CreateDateColumn({ type: 'string', precision: 0 })
  // readonly createdAt?: Date;

  // @UpdateDateColumn({ type: 'string', precision: 0 })
  // readonly updatedAt?: Date;
}
