import axios from "axios";
import { baseUrl, ResponseCodes } from "../Constatnt";
import { deleteAccess } from "../utils";
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

  public static async lookUp() {
    try {
      const response = await (await HandleToken.getInstance()).get(`region/lookUp`);
      return response.data;
    } catch (error) {
      HandleToken.delete(error);
      return error.response.data;
    }
  }
}
