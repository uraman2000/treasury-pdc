import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_number: string;

  @Column()
  client_name: string;

  @Column()
  client_account_status: number;

  @Column()
  client_check_status: number;
  
}
