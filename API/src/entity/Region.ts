import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  region_code: string;
}
