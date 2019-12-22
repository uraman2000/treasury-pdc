import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  region_code: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @IsNotEmpty()
  createdBy: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsNotEmpty()
  updatedBy: string;
}
