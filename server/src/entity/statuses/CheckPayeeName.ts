import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CheckPayeeName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;
}
