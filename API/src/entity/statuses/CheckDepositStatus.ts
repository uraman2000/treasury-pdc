import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class CheckDepositStatus {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id: number;

  @Column()
  status: string;
}
