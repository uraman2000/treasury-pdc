import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_number: string;

  @Column()
  bank_name: string;

  @Column()
  age: number;
}
