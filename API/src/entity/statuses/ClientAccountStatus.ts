import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ClientAccountStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
