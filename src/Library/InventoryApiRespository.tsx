import axios from "axios";
import IData from "../Components/Interfaces/IData";
import { baseUrl } from "../Constatnt";

class InventoryApiRespository {
  async getColumnNames() {
    try {
      const response = await axios.get(`${baseUrl}/inventory/column-names`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async getInventory() {
    try {
      const response = await axios.get(`${baseUrl}/inventory/`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async saveInventory(data: IData) {
    try {
      const response = await axios.post(`${baseUrl}/inventory/`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async deleteInventory(id: number) {
    try {
      const response = await axios.delete(`${baseUrl}/inventory/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default InventoryApiRespository;
