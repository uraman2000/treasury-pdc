import { MigrationInterface, QueryRunner } from "typeorm";
const inventory = require("./inventory.json");

export class populateInventory1573201839414 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const data = inventory;

    data.map(item => {
      console.log(item.region);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
