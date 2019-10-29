import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AccountStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
