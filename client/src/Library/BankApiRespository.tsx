import { baseUrl } from "../Constatnt";
import HandleToken from "./HandleToken";

export default class BankApiRespository {
  public static async All() {
    try {
      const response = await (await HandleToken.getInstance()).get(`bank/`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async lookUp() {
    try {
      const response = await (await HandleToken.getInstance()).get(`bank/lookUp`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async save(data: any) {
    try {
      const response = await (await HandleToken.getInstance()).post(`bank/`, data);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async delete(id: number) {
    try {
      const response = await (await HandleToken.getInstance()).delete(`${baseUrl}/bank/${id}`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}
