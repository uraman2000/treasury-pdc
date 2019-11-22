import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DepositTodayStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
