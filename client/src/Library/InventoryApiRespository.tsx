import IData from "../Components/Interfaces/IData";
import HandleToken from "./HandleToken";

class InventoryApiRespository {
  public static async getColumnNames() {
    try {
      const response = await (await HandleToken.getInstance()).get(`inventory/column-names`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async getInventory() {
    try {
      const response = await (await HandleToken.getInstance()).get(`inventory/column-names`);

      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async saveInventory(data: IData) {
    try {
      const response = await (await HandleToken.getInstance()).post(`inventory/`, data);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async saveInventoryBulk(data: any) {
    try {
      const response = await (await HandleToken.getInstance()).post(`inventory/bulk`, data);

      return response;
    } catch (error) {
      HandleToken.delete(error);
      return error.response;
    }
  }
  public static async deleteInventory(id: number) {
    try {
      const response = await (await HandleToken.getInstance()).delete(`inventory/${id}/`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}

export default InventoryApiRespository;
