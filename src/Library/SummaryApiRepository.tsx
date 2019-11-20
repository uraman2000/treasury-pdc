import axios from "axios";
import { baseUrl } from "../Constatnt";

export default class SummaryApiRepository {
  public static async getSummary(tableName: string) {
    try {
      const response = await axios.get(`${baseUrl}/summary/${tableName}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
