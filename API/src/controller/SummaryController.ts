import { getConnection } from "typeorm";
import { Request, Response } from "express";
import { PDCInventory } from "../entity/PDCInventory";
import { AccountStatus } from "../entity/statuses/AccountStatus";

class SummaryController {
  static clientAccount = async (req: Request, res: Response) => {
    let tableName = req.params.statusTableName;

    // available Table status name are :
    // check_deposite_status
    // account_status
    // client_check_status
    // reason_for_bounce_status
    // reson_for_hold_status

    res.status(200).send(await statusQuery(tableName));
  };
}

async function statusQuery(statusTable: string) {
  const ass = await getConnection()
    .createQueryBuilder()
    .select(`${statusTable}.id`, "ID")
    .addSelect(`${statusTable}.status`, "Status")
    .addSelect("Count(*)", "Count")
    .addSelect("SUM(check_amount)", "Sum")
    .from(statusTable, statusTable)
    .leftJoin(PDCInventory, "PDCInventory", `PDCInventory.client_account_status_ID = ${statusTable}.id`)
    .groupBy(`${statusTable}.id`)
    .getRawMany();
  return ass;
}
export default SummaryController;
