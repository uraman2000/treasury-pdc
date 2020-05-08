import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Roles } from "../entity/statuses/Roles";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    user.username = "admin";
    user.password = "admin";
    user.hashPassword();
    user.role = 1;
    user.region = 0;
    user.status = 2;
    const userRepository = getRepository(User);
    await userRepository.save(user);

    let roles = new Roles();
    roles.role = "ADMIN";
    roles.access = `{"region":false,"branch":false,"client_bank_name":false,"check_date":false,"check_number":false,"check_amount":false,"account_number":false,"client_name":false,"client_account_status":false,"client_check_status":false,"check_payee_name":false,"check_deposit_status":false,"reason_for_bounce_status":false,"deposit_today":false,"aging_undeposited":false,"check_type_as_of_current_day":false,"date_deposited":false,"date_bounced":false,"date_re_deposited":false,"aging_redep":false,"check_re_deposit_status":false,"date_hold":false,"reason_for_hold_status":false,"hold_check_aging":false,"OR_number":false,"OR_date":false,"remarks":false}`;
    const roleRepository = getRepository(Roles);
    await roleRepository.save(roles);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
