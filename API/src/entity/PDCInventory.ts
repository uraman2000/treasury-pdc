import { Entity, PrimaryGeneratedColumn, Column, Double, Long } from "typeorm";
import { Client } from "./Client";

@Entity()
export class PDCInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  region: string;

  @Column({ type: "varchar" })
  branch_name: string;

  @Column({ type: "varchar" })
  client_bank_name: string;

  @Column({ type: "date" })
  check_date: Date;

  @Column({ type: "int" })
  check_number: number;

  @Column({ type: "decimal", precision: 13, scale: 2 })
  check_amount: number;

  @Column({ type: "int" })
  client_ID: number;

  @Column({ type: "int" })
  client_account_status_ID: number;

  @Column({ type: "int" })
  client_check_status_ID: number;

  @Column({ type: "int" })
  check_payee_name_ID: number;

  @Column({ type: "int" })
  check_deposit_status_ID: number;

  @Column({ type: "int" })
  reason_for_bounce_status_ID: number;

  @Column({ type: "varchar" })
  deposit_today: string;

  @Column({ type: "varchar" })
  aging_undeposited: string;

  @Column({ type: "varchar" })
  check_type_as_of_current_day: string;

  @Column({ type: "date" })
  date_bounced: Date;

  @Column({ type: "date" })
  date_re_deposited: Date;

  @Column({ type: "varchar" })
  aging_redep: string;

  @Column({ type: "int" })
  check_re_deposit_status_ID: number;

  @Column({ type: "date" })
  date_hold: Date;

  @Column({ type: "int" })
  reason_for_hold_status_ID: number;

  @Column({ type: "int" })
  hold_check_aging: number;

  @Column({ type: "int" })
  OR_number: number;

  @Column({ type: "date" })
  OR_date: Date;

  @Column({ type: "varchar" })
  remarks: string;
}
