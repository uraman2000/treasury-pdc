import { getRepository, getConnection, Index } from "typeorm";
import { NextFunction, Request, Response } from "express";
import IResponse from "../../app/IResponse";
import { PDCInventory } from "../entity/PDCInventory";
import { CheckDepositStatus } from "../entity/statuses/CheckDepositStatus";
import { Branch } from "../entity/Branch";
import { number } from "prop-types";
import Convert from "../utils/Convert";

function statusRepository(statusTable: string) {
  return getRepository(statusTable);
}

function getCheckDepositStatus(region: any) {
  return getConnection()
    .createQueryBuilder()
    .select("branch.name", "branch_name")
    .addSelect(`check_deposit_status.status`, "status")
    .addSelect("SUM(check_amount)", "Amount")
    .from("check_deposit_status", "check_deposit_status")
    .leftJoin(PDCInventory, "pdc_inventory", `pdc_inventory.check_deposit_status = check_deposit_status.id`)
    .leftJoin(Branch, "branch", "pdc_inventory.branch = branch.code")
    .andWhere("pdc_inventory.region = :region")
    .setParameters({
      region: region
    })
    .groupBy(`check_deposit_status.id`)
    .addGroupBy("branch.name")
    .getRawMany();
}

function getClientCheckStatus(region: any) {
  return getConnection()
    .createQueryBuilder()
    .select("branch.name", "branch_name")
    .addSelect(`client_check_status.status`, "status")
    .addSelect("count(*)", "Count")
    .addSelect("SUM(check_amount)", "Amount")
    .from("client_check_status", "client_check_status")
    .leftJoin(PDCInventory, "pdc_inventory", `pdc_inventory.client_check_status = client_check_status.id`)
    .leftJoin(Branch, "branch", "pdc_inventory.branch = branch.code")
    .andWhere("pdc_inventory.region = :region")
    .setParameters({
      region: region
    })
    .groupBy(`client_check_status.id`)
    .addGroupBy("branch.name")
    .getRawMany();
}

export default class SummaryPerBranchController {
  static async all(req: Request, res: Response, next: NextFunction) {
    let region = req.params.regionId;

    const check_deposit_status = await getCheckDepositStatus(region);
    const client_check_status = await getClientCheckStatus(region);

    let obj: any = {};
    let grandTotal = 0;
    obj["entities"] = [];

    //  obj["grandTotal"] = Convert.amount(grandTotal);
    setValuesAndEntities(client_check_status, obj, "client_check_status");
    setTotalDeposit(obj, "client_check_status");
    setPercent(obj, "client_check_status");

    setValuesAndEntities(check_deposit_status, obj, "check_deposit_status");
    setTotalDeposit(obj, "check_deposit_status");
    setPercent(obj, "check_deposit_status");
    return res.status(200).send(obj);
  }
}

async function setValuesAndEntities(status, obj, typeOfStatus) {
  await status.forEach((item: any, index: any) => {
    //converting int by * 1 is much faster see this
    //https://flaviocopes.com/how-to-convert-string-to-number-javascript/
    // grandTotal += item.Amount * 1;
    setEntity(obj, item);
    if (!obj[item.branch_name]) {
      obj[item.branch_name] = { client_check_status: [], check_deposit_status: [] };
    }

    setValues(obj, item, typeOfStatus);
  });
}

function setValues(obj, item, typeOfStatus) {
  if (obj[item.branch_name][typeOfStatus].length === 0) {
    obj[item.branch_name][typeOfStatus] = instantiateValue(item, typeOfStatus);
    return;
  }

  obj[item.branch_name][typeOfStatus]["values"] = obj[item.branch_name][typeOfStatus]["values"].concat(
    value(item, typeOfStatus)
  );
}

function instantiateValue(item, typeOfStatus) {
  if (typeOfStatus === "check_deposit_status") {
    return {
      values: [value(item, typeOfStatus)],
      totalDeposit: 0
    };
  }

  return {
    values: [value(item, typeOfStatus)],
    totalDeposit: 0,
    totalCount: 0
  };
}

function value(item, typeOfStatus: string) {
  if (typeOfStatus === "check_deposit_status") {
    return {
      // branch: item.branch_name,
      status: item.status,
      amount: Convert.amount(item.Amount),
      amountPercentage: "0%"
    };
  }

  return {
    status: item.status,
    count: item.Count,
    countPercentage: "0%",
    amount: Convert.amount(item.Amount),
    amountPercentage: "0%"
  };
}

function setEntity(obj, item) {
  if (obj["entities"].indexOf(item.branch_name) == -1) {
    obj["entities"].push(item.branch_name);
  }
}

function setTotalDeposit(obj, typeOfStatus: string) {
  obj.entities.forEach(entity => {
    let totalAmount = 0;
    let totalCount = 0;
    obj[entity][typeOfStatus].values.forEach(element => {
      totalAmount += element.amount * 1;
      if (element.count) {
        totalCount += element.count * 1;
      }
    });

    obj[entity][typeOfStatus].totalDeposit = Convert.amount(totalAmount);
    obj[entity][typeOfStatus].totalCount = Convert.amount(totalCount);
  });
}

function setPercent(obj, typeOfStatus: string) {
  obj.entities.forEach(entity => {
    obj[entity][typeOfStatus].values.forEach(element => {
      element.amountPercentage = percentageFormula(element.amount, obj[entity][typeOfStatus].totalDeposit);
      if (element.countPercentage) {
        element.countPercentage = percentageFormula(element.count, obj[entity][typeOfStatus].totalCount);
      }
    });
  });
}

function percentageFormula(value, total) {
  return `${Convert.amount((value / total) * 100)}%`;
}
