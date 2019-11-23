import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

export class CreateAllStatus1572831545143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const accountStatus = ["ACTIVE", "RESTRUCTURED", "LEGAL", "MORATORIUM", "PUO", "CLOSED", "WRITE", "OFF"];
    const checkDespositeStatus = [
      "CLEARED",
      "BOUNCED",
      "FOR DEPOSIT-TODAY",
      "HOLD",
      "PDC",
      "UNDEPOSITED-PDC",
      "CHANGE CDS",
      "REDEPOSIT"
    ];

    const clientCkeckStatus = ["ACITVE", "CLOSED ACCOUNT"];

    const reasonForBounce = [
      "DAIF",
      "DAUD",
      "UNAUTHORIZED SIGNATORY",
      "ACCOUNT CLOSED",
      "SIGNATURE DIFFER",
      "AMOUNT & FIGURES DON'T MATCH",
      "OUT OF DATE",
      "STALE"
    ];
    const ResonForHold = [
      "REPLACEMENT OF CASH",
      "ACCOUNT UNDER LEGAL",
      "ACCOUNT UNDER MORATORIUM",
      "ACCOUNT UNDER RESTRUCTURE",
      "ACCOUNT UNDER REMEDIATION",
      "FOR DEPOSIT - SPECIFIC DAY",
      "ACCOUNT UNDER REPO",
      "(ROC):REQUESTED FOR DEPOSIT-CLEARED",
      "(ROC):REQUESTED FOR DEPOSIT-BOUNCED"
    ];

    const DepositTodayStatus = [" FOR DEPOSIT-TODAY", "UNDEPOSITED-PDC", "CHANGE CDS"];

    const CheckPayeeName = ["RADIOWEALTH FINANCE COMPANY INC"];
    const UserStatus = ["Pending", "Active", "Deactivate"];
    await this.save(queryRunner, accountStatus, "account_status");
    await this.save(queryRunner, checkDespositeStatus, "check_deposit_status");
    await this.save(queryRunner, clientCkeckStatus, "client_check_status");
    await this.save(queryRunner, reasonForBounce, "reason_for_bounce_status");
    await this.save(queryRunner, ResonForHold, "reason_for_hold_status");
    await this.save(queryRunner, DepositTodayStatus, "deposit_today_status");
    await this.save(queryRunner, CheckPayeeName, "check_payee_name");
    await this.save(queryRunner, UserStatus, "user_status");
  }
  // DELETE FROM account_status;
  // DELETE FROM migrations;
  // DELETE FROM user;
  private async save(queryRunner: QueryRunner, dataArray: any, table: string) {
    dataArray.forEach(element => {
      queryRunner.manager.query(`INSERT INTO ${table} VALUES (null,"${element}")`);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
