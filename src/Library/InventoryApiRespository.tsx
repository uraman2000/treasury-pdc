import axios from "axios";
import IData from "../Components/Interfaces/IData";
import { baseUrl, ResponseCodes } from "../Constatnt";
import { getAccess, setAccess } from "../utils";
import HandleToken from "./HandleToken";

class InventoryApiRespository {
  public static async getColumnNames() {
    try {
      const response = await (await HandleToken.getInstance()).get(`inventory/column-names`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  public static async getInventory() {
    try {
      const response = await (await HandleToken.getInstance()).get(`inventory/`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  public static async saveInventory(data: IData) {
    try {
      const response = await (await HandleToken.getInstance()).post(`inventory/`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  public static async deleteInventory(id: number) {
    try {
      const response = await (await HandleToken.getInstance()).delete(`${baseUrl}/inventory/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default InventoryApiRespository;