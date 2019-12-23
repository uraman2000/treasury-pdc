import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column({ length: 700 })
  @IsNotEmpty()
  access: string;
}
