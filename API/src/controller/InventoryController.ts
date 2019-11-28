import { getRepository, Repository, Connection, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { PDCInventory } from "../entity/PDCInventory";
import { validate } from "class-validator";
import { CheckDepositStatus } from "../entity/statuses/CheckDepositStatus";
import { ClientCheckStatus } from "../entity/statuses/ClientCheckStatus";
import { ReasonForBounceStatus } from "../entity/statuses/ReasonForBounceStatus";
import { ReasonForHoldStatus } from "../entity/statuses/ReasonForHoldStatus";
import IResponse from "../../app/IResponse";
import { CheckPayeeName } from "../entity/statuses/CheckPayeeName";
import { async } from "q";
import { number } from "prop-types";

class InventoryController {
  private userRepository = getRepository(PDCInventory);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  //   SELECT
  //     pdc_inventory.id,
  //     region,
  //     branch_name,
  //     client_bank_name,
  //     check_date,
  //     check_number,
  //     check_amount,
  //     client_ID,
  //     account_status.status,
  //     client_check_status.status,
  //     check_payee_name,
  //     check_deposit_status.status,
  //     reason_for_bounce_status.status,
  //     deposit_today,
  //     aging_undeposited,
  //     check_type_as_of_current_day,
  //     date_bounced,
  //     date_re_deposited,
  //     aging_redep,
  //     check_re_deposit_status.status,
  //     date_hold,
  //     reason_for_hold_status.status,
  //     hold_check_aging,
  //     OR_number,
  //     OR_date,
  //     remarks
  // FROM
  //     `pdc_inventory`
  // LEFT JOIN account_status ON account_status.id = pdc_inventory.client_account_status_ID
  // LEFT JOIN check_deposit_status ON check_deposit_status.id = pdc_inventory.check_deposit_status_ID
  // LEFT JOIN client_check_status ON client_check_status.id = pdc_inventory.client_check_status_ID
  // LEFT JOIN client_check_status AS check_re_deposit_status
  // ON
  //     check_re_deposit_status.id = pdc_inventory.check_re_deposit_status_ID
  // LEFT JOIN reason_for_bounce_status ON reason_for_bounce_status.id = pdc_inventory.reason_for_bounce_status_ID
  // LEFT JOIN reason_for_hold_status ON reason_for_hold_status.id = pdc_inventory.reason_for_hold_status_ID
  // GROUP BY
  //     pdc_inventory.id
  static all = async (req: Request, res: Response) => {
    // const PDCInventoryRepository = await getRepository(PDCInventory);
    // const dataPDCInventory = await PDCInventoryRepository.find({
    //   relations: [
    //     "client_account_status",
    //     "client_check_status",
    //     "check_payee_name",
    //     "check_deposit_status",
    //     "reason_for_bounce_status",
    //     "check_re_deposit_status",
    //     "reason_for_hold_status"
    //   ]
    // });
    const ass = await (await getAll()).getRawMany();

    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    console.log(formattedDate);

    const shh = await getRepository(PDCInventory).find();

    // shh.forEach(element => {
    //   element["check_date"] = "";
    //   element["date_bounced"] = element.date_bounced.toLocaleDateString() || null;
    //   element["date_re_deposited"] = element.date_re_deposited.toLocaleDateString() || null;
    //   element["date_hold"] = element.date_hold.toLocaleDateString() || null;
    //   element["OR_date"] = element.OR_date.toLocaleDateString() || null;
    // });

    res.status(200).send(shh);
  };

  static save = async (req: Request, res: Response) => {
    await getRepository(PDCInventory).save(req.body);
    res.status(201).send("User created");
  };

  static getColumnNames = async (req: Request, res: Response) => {
    const columns = Object.keys(await (await getAll()).getRawOne());

    const formated = columns.map(item => {
      return {
        title: toTitleCase(item.replace("_ID", "").replace(/_/g, " ")),
        field: item.replace("_ID", "")
      };
    });

    console.log(await getStatus("account_status"));
    res.status(200).send(formated);
  };

  static remove = async (req: Request, res: Response) => {
    const customRes: IResponse = {};
    let userToRemove = await getRepository(PDCInventory).findOne(req.params.id);
    try {
      await getRepository(PDCInventory).remove(userToRemove);
      customRes.message = `${userToRemove.client_ID} has been deleted`;
      customRes.status = "SUCCESS";
    } catch (error) {
      customRes.message = "data has been deleted already";
      customRes.status = "FAILED";
    }
    res.status(200).send(customRes);
  };
}

export default InventoryController;

function toTitleCase(phrase: any) {
  return phrase
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function validateErrors(res: any, object: any) {
  const errors = await validate(object);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
}

async function getAll() {
  return await getConnection()
    .createQueryBuilder()
    .select("id")
    .addSelect("region")
    .addSelect("branch_name")
    .addSelect("client_bank_name")
    .addSelect("check_date")
    .addSelect("check_number")
    .addSelect("check_amount")
    .addSelect("client_ID")
    .addSelect("client_account_status", "client_account_status")
    .addSelect("client_check_status", "client_check_status")
    .addSelect("check_payee_name", "check_payee_name")
    .addSelect("check_deposit_status", "check_deposit_status")
    .addSelect("reason_for_bounce_status", "reason_for_bounce_status")
    .addSelect("deposit_today")
    .addSelect("aging_undeposited")
    .addSelect("check_type_as_of_current_day")
    .addSelect("date_deposited")
    .addSelect("date_bounced")
    .addSelect("date_re_deposited")
    .addSelect("aging_redep")
    .addSelect("check_re_deposit_status", "check_re_deposit_status")
    .addSelect("date_hold")
    .addSelect("reason_for_hold_status", "reason_for_hold_status")
    .addSelect("hold_check_aging")
    .addSelect("OR_number")
    .addSelect("OR_date")
    .addSelect("remarks")
    .from(PDCInventory, "PDCInventory");
}

async function getStatus(statusTable: string) {
  const userRepository = await getRepository(statusTable);
  return await userRepository.find();
}
