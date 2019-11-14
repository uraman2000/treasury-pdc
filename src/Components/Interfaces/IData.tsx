export default interface IData {
  id: number;
  region: string;
  branch_name: string;
  client_bank_name: string;
  check_date: string;
  check_number: number;
  check_amount: number;
  client_ID: number;
  client_account_status: string;
  client_check_status: string;
  check_payee_name: string;
  check_deposit_status: string;
  reason_for_bounce_status: string;
  deposit_today: string;
  aging_undeposited: string;
  check_type_as_of_current_day: string;
  date_bounced: string;
  date_re_deposited: string;
  aging_redep: string;
  check_re_deposit_status: string;
  date_hold: string;
  reason_for_hold_status: string;
  hold_check_aging: number;
  OR_number: number;
  OR_date: string;
  remarks: string;
}
