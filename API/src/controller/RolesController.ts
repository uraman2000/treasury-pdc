import { Request, Response, NextFunction } from "express";
import { getRepository, Column } from "typeorm";
import { Region } from "../entity/Region";
import HandleResponse from "../../Constants/HandleResponse";
import { Roles } from "../entity/statuses/Roles";
import { PDCInventory } from "../entity/PDCInventory";
import { IsNotEmpty, validate, IsBoolean } from "class-validator";
import IResponse from "../../app/IResponse";
import ResponseCodes from "../../Constants/ResponseCodes";

export default class RolesController {
  static all = async (req: Request, res: Response) => {
    // console.log(JSON.parse(roles.access));
    let roles = await getRepository(Roles).find();

    roles.forEach(element => {
      element.access = JSON.parse(element.access);
    });
    res.send(roles);
  };

  static accessValue = async (req: Request, res: Response) => {
    res.send(await new Access());
  };

  static one = async (req: Request, res: Response) => {
    res.send(await getRepository(Roles).findOne(req.params.id));
  };

  static save = async (req: Request, res: Response) => {
    let { id, role }: Roles = req.body;
    let access: Access = req.body.access;

    let pdc = instantiateAccess(access);

    const customRes: IResponse = {};
    customRes.errors = await getErrors(pdc);

    if (customRes.errors.length > 0) {
      customRes.message = "Please Populate every details";
      res.status(ResponseCodes.BAD_REQUEST).send(customRes);
      return;
    }

    let roles = new Roles();
    roles.id = id;
    roles.role = role;
    roles.access = JSON.stringify(pdc);
    HandleResponse.save(res, roles, Roles);
  };

  static remove = async (req: Request, res: Response) => {
    HandleResponse.remove(res, req, Roles);
  };
}
const instantiateAccess = (accessValues: Access) => {
  let access = new Access();
  access.region = accessValues.region;
  access.branch = accessValues.branch;
  access.client_bank_name = accessValues.client_bank_name;
  access.check_date = accessValues.check_date;
  access.check_number = accessValues.check_number;
  access.check_amount = accessValues.check_amount;
  access.account_number = accessValues.account_number;
  access.client_name = accessValues.client_name;
  access.client_account_status = accessValues.client_account_status;
  access.client_check_status = accessValues.client_check_status;
  access.check_payee_name = accessValues.check_payee_name;
  access.check_deposit_status = accessValues.check_deposit_status;
  access.reason_for_bounce_status = accessValues.reason_for_bounce_status;
  access.deposit_today = accessValues.deposit_today;
  access.aging_undeposited = accessValues.aging_undeposited;
  access.check_type_as_of_current_day = accessValues.check_type_as_of_current_day;
  access.date_deposited = accessValues.date_deposited;
  access.date_bounced = accessValues.date_bounced;
  access.date_re_deposited = accessValues.date_re_deposited;
  access.aging_redep = accessValues.aging_redep;
  access.check_re_deposit_status = accessValues.check_re_deposit_status;
  access.date_hold = accessValues.date_hold;
  access.reason_for_hold_status = accessValues.reason_for_hold_status;
  access.hold_check_aging = accessValues.hold_check_aging;
  access.OR_number = accessValues.OR_number;
  access.OR_date = accessValues.OR_date;
  access.remarks = accessValues.remarks;

  return access;
};

const getErrors = async (entity: any) => {
  let validator = await validate(entity);
  const errors = [];
  await validator.map((item: any) => {
    errors.push("access." + item.constraints.isNotEmpty);
  });

  return errors;
};

export class Access {
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  region: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  branch: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  client_bank_name: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  check_date: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  check_number: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  check_amount: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  account_number: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  client_name: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  client_account_status: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  client_check_status: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  check_payee_name: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  check_deposit_status: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  reason_for_bounce_status: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  deposit_today: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  aging_undeposited: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  check_type_as_of_current_day: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  date_deposited: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  date_bounced: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  date_re_deposited: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  aging_redep: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  check_re_deposit_status: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  date_hold: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  reason_for_hold_status: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  hold_check_aging: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  OR_number: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  OR_date: boolean = false;
  @IsBoolean()
  @Column()
  @IsNotEmpty()
  remarks: boolean = false;
}
