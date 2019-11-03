export default interface IResponse {
  errors?: any;
  message?: any;
  data?: any;
  status?: "SUCCESS" | "FAILED";
}
