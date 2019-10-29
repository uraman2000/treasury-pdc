import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ResonForHoldStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
