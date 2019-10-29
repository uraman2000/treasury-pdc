import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CheckDepositeStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
