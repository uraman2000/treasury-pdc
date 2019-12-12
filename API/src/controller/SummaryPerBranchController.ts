import { getRepository, getConnection, Index } from "typeorm";
import { NextFunction, Request, Response } from "express";
import IResponse from "../../app/IResponse";
import { PDCInventory } from "../entity/PDCInventory";
import { CheckDepositStatus } from "../entity/statuses/CheckDepositStatus";
import { Branch } from "../entity/Branch";
import { number, array } from "prop-types";
import Convert from "../utils/Convert";

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

export default class SummaryPerBranchController {
  static async all(req: Request, res: Response, next: NextFunction) {
    let region = req.params.regionId;
    let result = [];
    const client_check_status = await getClientCheckStatus(region);
    const check_deposit_status = await getCheckDepositStatus(region);

    const model = initializeData(await getStatus("client_check_status"), await getStatus("check_deposit_status"));

    let obj: any = {};

    let grandTotal = 0;

    //  obj["grandTotal"] = Convert.amount(grandTotal);
    // setValuesAndEntities(client_check_status, obj, "client_check_status");
    // setTotalDeposit(obj, "client_check_status");
    // setPercent(obj, "client_check_status");

    // setValuesAndEntities(check_deposit_status, obj, "check_deposit_status");
    // setTotalDeposit(obj, "check_deposit_status");
    // setPercent(obj, "check_deposit_status");

    // setEmptyValues(obj, await getStatus("client_check_status"), "client_check_status");
    // setEmptyValues(obj, await getStatus("check_deposit_status"), "check_deposit_status");
    // console.log(Convert.total(check_deposit_status, "amount"));

    // return res.status(200).send(model["client_check_status"].values);

    // setStatusValues(result, check_deposit_status, "check_deposit_status", model);
    // setStatusValues(result, client_check_status, "client_check_status", model);

    check_deposit_status.map((item: any) => {
      //loop per status
      const tempModel = {
        branch_name: model.branch_name,
        client_check_status: [],
        check_deposit_status: []
      };
      var isPresent = result.some(e => e.branch_name === item.branch_name);
      if (!isPresent) {
        tempModel.branch_name = item.branch_name;
        result.push(tempModel);
      }
      // tempModel[typeOfStatus]["values"] = tempModel[typeOfStatus]["values"].concat(value(item, typeOfStatus));
    });
    const typeOfStatus = "check_deposit_status";
    check_deposit_status.map((item: any) => {
      result.map((res: any) => {
        if (res.branch_name === item.branch_name) {
          setValues(res, item, typeOfStatus);
        }
      });
    });

    result.map((item: any) => {
      model.check_deposit_status.values.map((modelValue: any) => {
        const isPresent = item.check_deposit_status.values.some(e => e.status === modelValue.status);
        if (!isPresent) {
          item.check_deposit_status.values.push(modelValue);
        }
      });
    });
    // result["check_deposit_status"].values.map((item: any) => {
    //   console.log(item);
    //   // model.check_deposit_status.values.forEach(element => {
    //   //   console.log(element);
    //   //   // if (element.status != item.status) {
    //   //   //   result["check_deposit_status"].values.push(element);
    //   //   // }
    //   // });
    // });
    return res.status(200).send(result);
  }
}

function setStatusValues(result, statusData, typeOfStatus, model) {
  statusData.map((item: any) => {
    const tempModel = {
      branch_name: model.branch_name,
      client_check_status: model.client_check_status,
      check_deposit_status: model.check_deposit_status
    };
    var isPresent = result.some(e => e.branch_name === item.branch_name);
    if (!isPresent) {
      tempModel.branch_name = item.branch_name;
      result.push(tempModel);
    }

    result.map((element: any) => {
      if (element.branch_name === item.branch_name) {
        tempModel[typeOfStatus].values.map((status: any) => {
          if (status.status === item.status) {
            if (typeOfStatus === "check_deposit_status") {
              return (status.amount = item.amount);
            }
            status.count = item.count;
            status.amount = item.amount;
          }
          console.log(tempModel);
          // model["check_deposit_status"].totalDeposit = Convert.total(check_deposit_status, "amount");
          if (typeOfStatus === "check_deposit_status") {
            return (tempModel[typeOfStatus].totalDeposit = Convert.total(
              tempModel[typeOfStatus].values,
              "amount"
            ));
          }

          console.log(tempModel);
          tempModel[typeOfStatus].totalDeposit = Convert.total(element[typeOfStatus].values, "amount");
          tempModel[typeOfStatus].totalCount = Convert.total(element[typeOfStatus].values, "count");
        });
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
      amount: item.amount ? Convert.amount(item.amount) : "0",
      amountPercentage: "0%"
    };
  }

  return {
    status: item.status,
    count: item.count ? item.count : "0",
    countPercentage: "0%",
    amount: item.amount ? Convert.amount(item.amount) : "0",
    amountPercentage: "0%"
  };
}

function setValues(res, item, typeOfStatus) {
  if (res.check_deposit_status["values"].length === 0) {
    res.check_deposit_status = instantiateValue(item, typeOfStatus);
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
