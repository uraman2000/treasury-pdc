import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import IResponse from "../../app/IResponse";

function statusRepository(statusTable: string) {
  return getRepository(statusTable);
}

// SELECT branch.branch_name, COUNT(*) AS 'count' 
// FROM `pdc_inventory`  
// LEFT JOIN branch ON pdc_inventory.branch_name = branch.id
// WHERE pdc_inventory.client_account_status = 1
// GROUP BY branch.branch_name


export default class SumarryPerBranchController {
  static async all(req: Request, res: Response, next: NextFunction) {
    let statusTable = req.params.tableName;
    return res.status(200).send(await statusRepository(statusTable).find());
  }
}
