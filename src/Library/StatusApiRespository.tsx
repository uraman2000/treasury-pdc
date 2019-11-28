import axios from "axios";
import { baseUrl } from "../Constatnt";
import HandleToken from "./HandleToken";

export default class StatusApiRespository {
  public static async allStatus() {
    try {
      const response = await (await HandleToken.getInstance()).get(`status/`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  public static async All(tableName: string) {
    try {
      const response = await (await HandleToken.getInstance()).get(`status/${tableName}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  public static async Save(tableName: string, data: any) {
    try {
      const response = await (await HandleToken.getInstance()).post(`status/${tableName}`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  public static async Delete(tableName: string, id: any) {
    try {
      const response = await (await HandleToken.getInstance()).delete(`status/${tableName}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}
