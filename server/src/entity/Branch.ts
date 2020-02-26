import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  region_code: string;
}
