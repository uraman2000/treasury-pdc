import { Entity, PrimaryGeneratedColumn, Column, Double, Long, JoinColumn, OneToOne } from "typeorm";
import { Client } from "./Client";
import { AccountStatus } from "./statuses/AccountStatus";
import { ClientCheckStatus } from "./statuses/ClientCheckStatus";
import { CheckPayeeName } from "./statuses/CheckPayeeName";
import { CheckDepositStatus } from "./statuses/CheckDepositStatus";
import { ReasonForBounceStatus } from "./statuses/ReasonForBounceStatus";
import { ReasonForHoldStatus } from "./statuses/ReasonForHoldStatus";

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

  @OneToOne(type => AccountStatus)
  @JoinColumn()
  client_account_status: AccountStatus;

  @OneToOne(type => ClientCheckStatus)
  @JoinColumn()
  client_check_status: ClientCheckStatus;

  @OneToOne(type => CheckPayeeName)
  @JoinColumn()
  check_payee_name: CheckPayeeName;

  @OneToOne(type => CheckDepositStatus)
  @JoinColumn()
  check_deposit_status: CheckDepositStatus;

  @OneToOne(type => ReasonForBounceStatus)
  @JoinColumn()
  reason_for_bounce_status: ReasonForBounceStatus;

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

  @OneToOne(type => CheckDepositStatus)
  @JoinColumn()
  check_re_deposit_status: CheckDepositStatus;

  @Column({ type: "date" })
  date_hold: Date;

  @OneToOne(type => ReasonForHoldStatus)
  @JoinColumn()
  reason_for_hold_status: ReasonForHoldStatus;

  @Column({ type: "int" })
  hold_check_aging: number;

  @Column({ type: "int" })
  OR_number: number;

  @Column({ type: "date" })
  OR_date: Date;

  @Column({ type: "varchar" })
  remarks: string;
}
