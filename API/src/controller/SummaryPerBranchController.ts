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

export default class SummaryPerBranchController {
  static async all(req: Request, res: Response, next: NextFunction) {
    let region = req.params.regionId;

    const sql = await getConnection()
      .createQueryBuilder()
      .select("branch.name", "branch_name")
      .addSelect(`check_deposit_status.status`, "status")
      // .addSelect("count(*)", "Count")
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

    let obj: any = {};
    let grandTotal = 0;
    obj["entities"] = [];

    await sql.forEach((item: any, index: any) => {
      //converting int by * 1 is much faster see this
      //https://flaviocopes.com/how-to-convert-string-to-number-javascript/
      grandTotal += item.Amount * 1;
      setEntity(obj, item);
      setValues(obj, item);
    });
    //  obj["grandTotal"] = Convert.amount(grandTotal);

    setTotalDeposit(obj);
    setPercent(obj);
    return res.status(200).send(obj);
  }
}

function value(item) {
  return {
    // branch: item.branch_name,
    status: item.status,
    amount: Convert.amount(item.Amount),
    percentage: "0%"
  };
}
function setValues(obj, item) {
  if (obj[item.branch_name]) {
    obj[item.branch_name]["values"] = obj[item.branch_name]["values"].concat(value(item));
    return;
  }
  obj[item.branch_name] = { values: [value(item)], totalDeposit: 0 };
}
function setEntity(obj, item) {
  if (obj["entities"].indexOf(item.branch_name) == -1) {
    obj["entities"].push(item.branch_name);
  }
}

function setTotalDeposit(obj) {
  obj.entities.forEach(entity => {
    let total = 0;
    obj[entity].values.forEach(element => {
      total += element.amount * 1;
    });
    obj[entity].totalDeposit = Convert.amount(total);
  });
}

function setPercent(obj) {
  obj.entities.forEach(entity => {
    obj[entity].values.forEach(element => {
      element.percentage = `${Convert.amount((element.amount / obj[entity].totalDeposit) * 100)}%`;
    });
  });
}
