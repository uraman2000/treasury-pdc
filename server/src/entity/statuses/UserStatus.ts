import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
