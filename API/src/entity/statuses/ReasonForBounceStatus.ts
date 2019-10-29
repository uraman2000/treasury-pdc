import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ReasonForBounceStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
