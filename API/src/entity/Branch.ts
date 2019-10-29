import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  branch_name: string;

  @Column()
  code: string;
}
