import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ECurrency } from '@resources';

@Entity({ name: 'exchange-rates' })
export class ExchangeRate {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({
    type: 'enum',
    enum: ECurrency,
    enumName: 'currency',
    nullable: false,
  })
  origin!: ECurrency;

  @Column({
    type: 'enum',
    enum: ECurrency,
    enumName: 'currency',
    nullable: false,
  })
  destination!: ECurrency;

  @Column({ type: 'decimal', precision: 16, scale: 8, nullable: false })
  rate!: string;

  @Column({ name: 'exchange_rate_date', type: 'timestamp', nullable: false })
  exchangeRateDate!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
