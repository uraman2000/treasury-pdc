import { getRepository, getConnection, Index } from "typeorm";
import { NextFunction, Request, Response } from "express";
import IResponse from "../../app/IResponse";
import { PDCInventory } from "../entity/PDCInventory";
import { CheckDepositStatus } from "../entity/statuses/CheckDepositStatus";
import { Branch } from "../entity/Branch";
import Utils from "../utils/Utils";

function statusRepository(statusTable: string) {
  return getRepository(statusTable);
}

function setModel(branch_name, client_check_status, check_deposit_status) {
  return {
    branch_name: branch_name,
    client_check_status: client_check_status,
    check_deposit_status: check_deposit_status
  };
}

function getCheckDepositStatus(region: any) {
  return getConnection()
    .createQueryBuilder()
    .select("branch.name", "branch_name")
    .addSelect(`check_deposit_status.status`, "status")
    .addSelect("SUM(check_amount)", "amount")
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
    .addSelect("count(*)", "count")
    .addSelect("SUM(check_amount)", "amount")
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

function getStatus(status) {
  return getConnection()
    .createQueryBuilder()
    .select("*")
    .from(status, status)
    .getRawMany();
}
const CHECK_DEPOSIT_STATUS = "check_deposit_status";
const CLIENT_CHECK_STATUS = "client_check_status";
export default class SummaryPerBranchController {
  static async all(req: Request, res: Response, next: NextFunction) {
    let region = req.params.regionId;
    let result = [];
    const client_check_status = await getClientCheckStatus(region);
    const check_deposit_status = await getCheckDepositStatus(region);
    const model = initializeData(await getStatus(CLIENT_CHECK_STATUS), await getStatus(CHECK_DEPOSIT_STATUS));

    setData(client_check_status, result, CLIENT_CHECK_STATUS);
    setData(check_deposit_status, result, CHECK_DEPOSIT_STATUS);
    fillEmptyData(model, result, CLIENT_CHECK_STATUS);
    fillEmptyData(model, result, CHECK_DEPOSIT_STATUS);

    return res.status(200).send(result);
  }
}

function setData(statusObj, result, typeOfStatus) {
  statusObj.map((item: any) => {
    //loop per status
    const tempModel = {
      branch_name: "",
      client_check_status: [{ values: [] }],
      check_deposit_status: [{ values: [] }]
    };

    if (!Utils.isPresent(result, "branch_name", item.branch_name)) {
      tempModel.branch_name = item.branch_name;
      result.push(tempModel);
    }
    // tempModel[typeOfStatus]["values"] = tempModel[typeOfStatus]["values"].concat(value(item, typeOfStatus));
    result.map((res: any) => {
      if (res.branch_name === item.branch_name) {
        setValues(res, item, typeOfStatus);
      }
      res[typeOfStatus].totalDeposit = Utils.total(res[typeOfStatus].values, "amount");
      if (res[typeOfStatus].totalCount !== undefined) {
        res[typeOfStatus].totalCount = Utils.total(res[typeOfStatus].values, "count");
      }
      res[typeOfStatus].values.map((item: any) => {
        if (item.countPercentage !== undefined) {
          item.countPercentage = Utils.calculatePercentage(item.count, res[typeOfStatus].totalCount);
        }

        item.amountPercentage = Utils.calculatePercentage(item.amount, res[typeOfStatus].totalDeposit);
      });
    });
  });
}
function fillEmptyData(model, result, typeOfStatus) {
  if (result.length === 0) {
    result.push(model);
  }
  model[typeOfStatus].values.map((modelValue: any) => {
    result.map((item: any) => {
      if (item[typeOfStatus].values.length === 0) {
        item[typeOfStatus] = model[typeOfStatus];
      }
      if (!Utils.isPresent(item[typeOfStatus].values, "status", modelValue.status)) {
        item[typeOfStatus].values.push(modelValue);
      }
    });
  });
}
function initializeData(client_check_status, check_deposit_status) {
  return setModel(
    "",
    initializeStatus(client_check_status, "client_check_status"),
    initializeStatus(check_deposit_status, "check_deposit_status")
  );
}

function initializeStatus(status, typeOfStatus) {
  let values = status.map((item: any) => value(item, typeOfStatus));
  if (typeOfStatus === "client_check_status") {
    return {
      values: values,
      totalDeposit: "0",
      totalCount: "0"
    };
  }
  return {
    values: values,
    totalDeposit: "0"
  };
}
function value(item, typeOfStatus: string) {
  if (typeOfStatus === "check_deposit_status") {
    return {
      // branch: item.branch_name,
      status: item.status,
      amount: item.amount ? Utils.amount(item.amount) : "0",
      amountPercentage: "0%"
    };
  }

  return {
    status: item.status,
    count: item.count ? item.count : "0",
    countPercentage: "0%",
    amount: item.amount ? Utils.amount(item.amount) : "0",
    amountPercentage: "0%"
  };
}

function setValues(res, item, typeOfStatus) {
  if (res[typeOfStatus]["values"].length === 0) {
    res[typeOfStatus] = instantiateValue(item, typeOfStatus);
    return;
  }
  res[typeOfStatus]["values"] = res[typeOfStatus]["values"].concat(value(item, typeOfStatus));
}

function instantiateValue(item, typeOfStatus): any {
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
