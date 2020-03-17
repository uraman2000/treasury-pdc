import { Entity, PrimaryGeneratedColumn, Column, Double, Long, JoinColumn, OneToOne } from "typeorm";
import { ClientAccountStatus } from "./statuses/ClientAccountStatus";
import { ClientCheckStatus } from "./statuses/ClientCheckStatus";
import { CheckPayeeName } from "./statuses/CheckPayeeName";
import { CheckDepositStatus } from "./statuses/CheckDepositStatus";
import { ReasonForBounceStatus } from "./statuses/ReasonForBounceStatus";
import { ReasonForHoldStatus } from "./statuses/ReasonForHoldStatus";

@Entity()
export class PDCInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  region: number;

  @Column({ type: "varchar" })
  branch: string;

  @Column({ type: "varchar" })
  client_bank_name: string;

  @Column({ type: "date" })
  check_date: Date;

  @Column({ type: "int" })
  check_number: number;

  @Column({ type: "decimal", precision: 13, scale: 2 })
  check_amount: number;

  @Column({ type: "int" })
  account_number: number;

  @Column()
  client_name: string;

  @Column({ type: "int" })
  client_account_status: number;

  @Column({ type: "int" })
  client_check_status: number;

  @Column({ type: "int" })
  check_payee_name: number;

  @Column({ type: "int" })
  check_deposit_status: number;

  @Column({ type: "int" })
  reason_for_bounce_status: number;

  @Column({ type: "varchar" })
  deposit_today: string;

  @Column({ type: "int" })
  aging_undeposited: number;

  @Column({ type: "varchar" })
  check_type_as_of_current_day: string;

  @Column({ type: "int" })
  bank_deposited: number;

  @Column({ type: "int" })
  account_deposited: number;

  @Column({ type: "date" })
  date_deposited: Date;

  @Column({ type: "date" })
  date_bounced: Date;

  @Column({ type: "date" })
  date_re_deposited: Date;

  @Column({ type: "varchar" })
  aging_redep: string;

  @Column({ type: "int" })
  check_re_deposit_status: number;

  @Column({ type: "date" })
  date_hold: Date;

  @Column({ type: "int" })
  reason_for_hold_status: number;

  @Column({ type: "date" })
  date_for_deposit_specific_day: Date;

  @Column({ type: "int" })
  hold_check_aging: number;

  @Column({ type: "int" })
  OR_number: number;

  @Column({ type: "date" })
  OR_date: Date;

  @Column({ type: "int" })
  reason_for_hold_status_after_held_check: number;

  @Column({ type: "varchar" })
  remarks: string;
}
