import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ClientCheckStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
