import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CheckDepositStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
