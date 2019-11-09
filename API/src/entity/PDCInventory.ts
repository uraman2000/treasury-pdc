import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Client } from "./Client";

@Entity()
export class PDCInventory {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  region: string;

  @Column()
  branch_name: string;

  @Column()
  client_bank_name: string;

  @Column()
  check_date: string;

  @Column()
  check_number: string;

  @Column()
  check_amount: string;

  @Column()
  client_ID: number;

  @Column()
  client_account_status_ID: number;

  @Column()
  client_check_status_ID: number;

  @Column()
  check_payee_name: string;

  @Column()
  check_deposit_status_ID: number;

  @Column()
  reason_for_bounce_ID: number;

  @Column()
  deposite_today: string;

  @Column()
  aging_undeposited: string;

  @Column()
  check_type_as_of_current_day: string;

  @Column()
  date_bounced: string;

  @Column()
  date_re_deposited: string;

  @Column()
  aging_redep: string;

  @Column()
  check_re_deposit_status_ID: number;

  @Column()
  date_hold: string;

  @Column()
  reson_for_hold_ID: string;

  @Column()
  hold_check_aging: number;

  @Column()
  OR_number: number;

  @Column()
  OR_date: string;

  @Column()
  remarks: string;
}
