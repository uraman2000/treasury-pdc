import { getConnection } from "typeorm";
import { Request, Response } from "express";
import { PDCInventory } from "../entity/PDCInventory";
import { AccountStatus } from "../entity/statuses/AccountStatus";
import Convert from "../utils/Convert";

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
  let statusItem: StatusItem[] = await queryStatus(statusTable);
  let statusList: StatusList = {};
  statusList.totalCount = 0;
  statusList.totalAmount = 0;

  statusItem.map(item => {
    statusList.totalCount += item.count;
    statusList.totalAmount += item.amount;
  });
  statusList.totalAmount = Convert.amount(statusList.totalAmount);

  statusList.statusItem = statusItem;

  statusList = await calculatePercentage(statusList);

  return statusList;
}

function calculatePercentage(statusList: StatusList): StatusList {
  let listTemp = statusList;
  let statusItemTemp = statusList.statusItem.map((item: StatusItem) => ({
    ID: item.ID,
    status: item.status,
    count: item.count,
    amount: item.amount,
    countPercentage: (item.count / listTemp.totalCount) * 100 + "%",
    amountPercentage: ((item.amount / listTemp.totalAmount) * 100).toFixed(3) + "%"
  }));

  listTemp.statusItem = statusItemTemp;
  statusList.totalCountPercent = 0;
  statusList.totalAmountPercent = 0;
  listTemp.statusItem.map(item => {
    const countpercentage: number = parseFloat(item.countPercentage.replace("%", ""));
    const amountpercentage: number = parseFloat(item.amountPercentage.replace("%", ""));
    statusList.totalCountPercent += countpercentage;
    statusList.totalAmountPercent += amountpercentage;
  });

  statusList.totalCountPercent = `${statusList.totalCountPercent}%`;
  statusList.totalAmountPercent = `${statusList.totalAmountPercent}%`;
  return listTemp;
}

async function queryStatus(statusTable: string) {
  const temp = await getConnection()
    .createQueryBuilder()
    .select(`${statusTable}.id`, "ID")
    .addSelect(`${statusTable}.status`, "status")
    .addSelect("Count(*)", "count")
    .addSelect("SUM(check_amount)", "amount")
    .from(statusTable, statusTable)
    .leftJoin(PDCInventory, "PDCInventory", `PDCInventory.client_account_status_ID = ${statusTable}.id`)
    .groupBy(`${statusTable}.id`)
    .getRawMany();

  const cleanup = temp.map(item => ({
    ID: item.ID,
    status: item.status,
    count: item.amount == null ? 0 : parseFloat(item.count),
    amount: item.amount == null ? 0 : parseFloat(item.amount)
  }));
  return cleanup;
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
  totalAmount?: number;
  totalAmountPercent?: any;
}
