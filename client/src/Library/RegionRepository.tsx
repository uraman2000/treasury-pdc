import axios from "axios";
import { baseUrl, ResponseCodes } from "../Constatnt";
import { deleteAccess, getAccess, isAdmin } from "../utils";
import HandleToken from "./HandleToken";

export default class RegionRepository {
  public static async All() {
    try {
      const response = await (await HandleToken.getInstance()).get(`region/`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }

  public static async save(data: any) {
    try {
      const response = await (await HandleToken.getInstance()).post(`region/`, data);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
  public static async delete(id: number) {
    try {
      const response = await (await HandleToken.getInstance()).delete(`region/${id}`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
  public static async lookUp() {
    try {
      const region = isAdmin() ? null : getAccess().region;

      const response = await (await HandleToken.getInstance()).get(`region/lookUp?region=${region}`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}
