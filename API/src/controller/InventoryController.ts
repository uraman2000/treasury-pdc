import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { PDCInventory } from "../entity/PDCInventory";
import { validate } from "class-validator";
import IResponse from "../../app/IResponse";
import { CheckDepositStatus } from "../entity/statuses/CheckDepositStatus";
import { Branch } from "../entity/Branch";
import { ClientAccountStatus } from "../entity/statuses/ClientAccountStatus";
import { ReasonForHoldStatus } from "../entity/statuses/ReasonForHoldStatus";
import ResponseCodes from "../../Constants/ResponseCodes";

function nullIdentifier(value: any) {
  return value ? value : "";
}
export default class InventoryController {
  private userRepository = getRepository(PDCInventory);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  static summaryHeldChecks = async (req: Request, res: Response, next: NextFunction) => {
    let region = req.params.regionId;
    const pdc = await getConnection()
      .createQueryBuilder()
      .select("branch.name", "branch_name")
      .addSelect("client_bank_name")
      .addSelect("check_date")
      .addSelect("check_number")
      .addSelect("check_amount")
      .addSelect("account_number")
      .addSelect("client_name")
      .addSelect("client_account_status.status", "client_account_status")
      .addSelect("date_hold")
      .addSelect(" reason_for_hold_status.status", " reason_for_hold_status")
      .addSelect(" hold_check_aging")
      .from(PDCInventory, "PDCInventory")
      .leftJoin(Branch, "branch", "PDCInventory.branch = branch.id")
      .leftJoin(
        CheckDepositStatus,
        "check_deposit_status",
        "PDCInventory.check_deposit_status = check_deposit_status.id"
      )
      .leftJoin(
        ClientAccountStatus,
        "client_account_status",
        "PDCInventory.client_account_status = client_account_status.id"
      )
      .leftJoin(
        ReasonForHoldStatus,
        "reason_for_hold_status",
        "PDCInventory.reason_for_hold_status = reason_for_hold_status.id"
      )
      .where("check_deposit_status.status = :status", { status: "HOLD" })
      .andWhere("PDCInventory.region = :region", { region: region })
      .getRawMany();
    nullIdentifier("ass");

    const cleanPDC = pdc.map((item: any, key: any) => {
      return {
        branch_name: nullIdentifier(item.branch_name),
        client_account_status: nullIdentifier(item.client_account_status),
        client_bank_name: nullIdentifier(item.client_bank_name),
        check_date: nullIdentifier(item.check_date),
        check_number: nullIdentifier(item.check_number),
        check_amount: nullIdentifier(item.check_amount),
        account_number: nullIdentifier(item.account_number),
        client_name: nullIdentifier(item.client_name),
        date_hold: nullIdentifier(item.date_hold),
        reason_for_hold_status: nullIdentifier(item.reason_for_hold_status),
        hold_check_aging: nullIdentifier(item.hold_check_aging)
      };
    });
    res.status(ResponseCodes.OK).send(cleanPDC);
  };

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }
  static all = async (req: Request, res: Response) => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    console.log(formattedDate);

    const shh = await getRepository(PDCInventory).find();

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
      customRes.message = `${userToRemove.client_name} has been deleted`;
    } catch (error) {
      customRes.message = "data has been deleted already";
    }
    res.status(200).send(customRes);
  };
}

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
    .addSelect("branch")
    .addSelect("client_bank_name")
    .addSelect("check_date")
    .addSelect("check_number")
    .addSelect("check_amount")
    .addSelect("client_name")
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
