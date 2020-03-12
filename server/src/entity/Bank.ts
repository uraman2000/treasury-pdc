import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_name: string;

  // @Column()
  // created_by: string;

  // @Column()
  // @CreateDateColumn()
  // createdAt: Date;

  // @Column()
  // account_number: string;

  // @Column()
  // maintaining_balance: string;

  // @Column()
  // chq_cost_perpc: string;

  // @Column()
  // region: string;

  // @Column()
  // buffer: string;
}
