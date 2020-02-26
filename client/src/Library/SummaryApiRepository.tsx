import axios from "axios";
import { baseUrl } from "../Constatnt";
import HandleToken from "./HandleToken";

export default class SummaryApiRepository {
  public static async getSummary(tableName: string) {
    try {
      const response = await (await HandleToken.getInstance()).get(`summary/${tableName}`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async getSummaryPerBranch(region: string) {
    try {
      const response = await (await HandleToken.getInstance()).get(`summary-per-branch/${region}`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async getSummaryReport(region: string) {
    try {
      const response = await (await HandleToken.getInstance()).get(`inventory/summary-held-checks/${region}`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}
