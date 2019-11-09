import { MigrationInterface, QueryRunner, getRepository, getConnection } from "typeorm";
import { AccountStatus } from "../entity/statuses/AccountStatus";
const inventory = require("./inventory.json");

export class populateInventory1573201839414 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const data = inventory;
    const accountRepository = getRepository(AccountStatus);
    const statuses = await accountRepository.find();



    // console.log(statuses);
    data.map((item) => {
      if (item.client_account_status_ID == "ACTIVE") {
        item.client_account_status_ID = 1;
      }

      console.log(item.client_account_status_ID);
    });

  }

  public async down(queryRunner: QueryRunner): Promise<any> { }
}
