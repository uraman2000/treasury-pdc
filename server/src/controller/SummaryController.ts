import { getConnection } from "typeorm";
import { Request, Response } from "express";
import { PDCInventory } from "../entity/PDCInventory";
import Utils from "../utils/Utils";

class SummaryController {
  static summaryStatus = async (req: Request, res: Response) => {
    let tableName = req.params.statusTableName;

    if (tableName === "deposit_today_status" || tableName === "check_payee_name") {
      res.status(200).send(await status(tableName));
    }
    res.status(200).send(await statusWithPercentage(tableName));
    // available Table status name are :
    // check_deposite_status
    // account_status
    // client_check_status
    // reason_for_bounce_status
    // reson_for_hold_status
  };
}

async function status(tableName: string) {
  let field = "status";
  if (tableName === "check_payee_name") {
    field = "name";
  }
  return await getConnection()
    .createQueryBuilder()
    .select(`${tableName}.id`, "ID")
    .addSelect(`${tableName}.${field}`, "status")
    .addSelect("Count(*)", "count")
    .addSelect("SUM(check_amount)", "amount")
    .from(tableName, tableName)
    .leftJoin(PDCInventory, "PDCInventory", `PDCInventory.${tableName}_ID = ${tableName}.id`)
    .groupBy(`${tableName}.id`)
    .getRawMany();
}

async function statusWithPercentage(tableName: string) {
  let statusItem: StatusItem[] = await queryWithPercentage(tableName);
  let statusList: StatusList = {};
  statusList.totalCount = 0;
  statusList.totalAmount = 0;

  statusItem.map((item) => {
    statusList.totalCount += item.count;
    statusList.totalAmount += item.amount;
  });
  statusList.totalAmount = Utils.amount(statusList.totalAmount);

  statusList.statusItem = statusItem;

  statusList = await calculatePercentage(statusList);

  return statusList;
}
async function queryWithPercentage(statusTable: string) {
  const temp = await getConnection()
    .createQueryBuilder()
    .select(`${statusTable}.id`, "ID")
    .addSelect(`${statusTable}.status`, "status")
    .addSelect("Count(*)", "count")
    .addSelect("SUM(check_amount)", "amount")
    .from(statusTable, statusTable)
    .leftJoin(PDCInventory, "PDCInventory", `PDCInventory.${statusTable} = ${statusTable}.id`)
    .groupBy(`${statusTable}.id`)
    .getRawMany();

  const cleanup = temp.map((item) => ({
    ID: item.ID,
    status: item.status,
    count: item.amount == null ? 0 : parseFloat(item.count),
    amount: item.amount == null ? 0 : parseFloat(item.amount),
  }));
  return cleanup;
}

function calculatePercentage(statusList: StatusList): StatusList {
  let listTemp = statusList;
  let statusItemTemp = statusList.statusItem.map((item: StatusItem) => ({
    ID: item.ID,
    status: item.status,
    count: item.count,
    amount: item.amount,
    // countPercentage: item.count == 0 ? "0%" : (item.count / listTemp.totalCount) * 100 + "%",
    countPercentage: item.count == 0 ? "0%" : Utils.calculatePercentage(item.count, listTemp.totalCount),
    amountPercentage: item.count == 0 ? "0%" : Utils.calculatePercentage(item.amount, listTemp.totalAmount),
    // amountPercentage: item.amount == 0 ? "0%" : `${((item.amount / listTemp.totalAmount) * 100).toFixed(3)} %`
  }));

  listTemp.statusItem = statusItemTemp;
  statusList.totalCountPercent = 0;
  statusList.totalAmountPercent = 0;
  listTemp.statusItem.map((item, key) => {
    const countpercentage: number = parseFloat(item.countPercentage.replace("%", ""));
    const amountpercentage: number = parseFloat(item.amountPercentage.replace("%", ""));
    statusList.totalCountPercent += countpercentage;
    statusList.totalAmountPercent += amountpercentage;

    // if (key + 1 === listTemp.statusItem.length) {
    // }
  });

  console.log(listTemp.statusItem.length);

  statusList.totalCountPercent = `${Utils.roundNumber(statusList.totalCountPercent)}%`;
  statusList.totalAmountPercent = `${Utils.roundNumber(statusList.totalAmountPercent)}%`;
  return listTemp;
}

export default SummaryController;

interface StatusItem {
  ID: number;
  status: string;
  count: number;
  countPercentage?: string;
  amount: number;
  amountPercentage?: string;
}

interface StatusList {
  statusItem?: StatusItem[];
  totalCount?: number;
  totalCountPercent?: any;
  totalAmount?: any;
  totalAmountPercent?: any;
}
