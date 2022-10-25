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
  status?: 'yet' | 'in_progress' | 'done';

  @Column({ nullable: true })
  deadline?: Date | null;

  @Column({ nullable: true })
  completedAt?: Date | null;

  @Column()
  workingHours?: number;

  @Column({ update: false })
  createdBy: string;
}
