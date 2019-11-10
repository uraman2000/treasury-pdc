import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ReasonForHoldStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
