import { getRepository, Repository, Connection, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { PDCInventory } from "../entity/PDCInventory";
import { validate } from "class-validator";
import { AccountStatus } from "../entity/statuses/AccountStatus";
import { CheckDepositStatus } from "../entity/statuses/CheckDepositStatus";
import { ClientCheckStatus } from "../entity/statuses/ClientCheckStatus";
import { ReasonForBounceStatus } from "../entity/statuses/ReasonForBounceStatus";
import { ReasonForHoldStatus } from "../entity/statuses/ReasonForHoldStatus";
import IResponse from "../../app/IResponse";

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
    const ass = await getConnection()
      .createQueryBuilder()
      .select("PDCInventory.id", "id")
      .addSelect("region")
      .addSelect("branch_name")
      .addSelect("client_bank_name")
      .addSelect("check_date")
      .addSelect("check_number")
      .addSelect("check_amount")
      .addSelect("client_ID")
      .addSelect("account_status.status", "account_status")
      .addSelect("client_check_status.status", "client_check_status")
      .addSelect("check_payee_name")
      .addSelect("check_deposit_status.status", "check_deposit_status")
      .addSelect("reason_for_bounce_status.status", "reason_for_bounce_status")
      .addSelect("deposit_today")
      .addSelect("aging_undeposited")
      .addSelect("check_type_as_of_current_day")
      .addSelect("date_bounced")
      .addSelect("date_re_deposited")
      .addSelect("aging_redep")
      .addSelect("check_re_deposit_status.status", "check_re_deposit_status")
      .addSelect("date_hold")
      .addSelect("reason_for_hold_status.status", "reason_for_hold_status")
      .addSelect("hold_check_aging")
      .addSelect("OR_number")
      .addSelect("OR_date")
      .addSelect("remarks")

      .from(PDCInventory, "PDCInventory")
      // .leftJoin(PDCInventory, "PDCInventory", `PDCInventory.client_account_status_ID = ${statusTable}.id`)
      .leftJoin(AccountStatus, "account_status", `PDCInventory.client_account_status_ID = account_status.id`)
      .leftJoin(
        CheckDepositStatus,
        "check_deposit_status",
        `PDCInventory.check_deposit_status_ID = check_deposit_status.id`
      )
      .leftJoin(
        ClientCheckStatus,
        "client_check_status",
        `PDCInventory.client_check_status_ID = client_check_status.id`
      )
      .leftJoin(
        ClientCheckStatus,
        "check_re_deposit_status",
        `PDCInventory.check_re_deposit_status_ID = check_re_deposit_status.id`
      )
      .leftJoin(
        ReasonForBounceStatus,
        "reason_for_bounce_status",
        `PDCInventory.reason_for_bounce_status_ID = reason_for_bounce_status.id`
      )
      .leftJoin(
        ReasonForHoldStatus,
        "reason_for_hold_status",
        `PDCInventory.reason_for_hold_status_ID = reason_for_hold_status.id`
      )
      .groupBy("PDCInventory.id")
      .getRawMany();

    res.status(200).send(ass);
  };

  static save = async (req: Request, res: Response) => {
    await getRepository(PDCInventory).save(req.body);
    res.status(201).send("User created");
  };

  static getColumnNames = async (req: Request, res: Response) => {
    const columns = await getConnection()
      .getMetadata(PDCInventory)
      .ownColumns.map(column => ({
        title: toTitleCase(column.propertyName.replace("_ID", "").replace(/_/g, " ")),
        field: column.propertyName.replace("_ID", "")
      }));

    res.status(201).send(columns);
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
