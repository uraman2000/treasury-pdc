import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region_name: string;

  @Column()
  code: string;
}
