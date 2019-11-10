import React from "react";
import axios from "axios";
const baseUrl = "http://localhost:3011";
class ApiRespository {
  async getColumnNames() {
    try {
      const response = await axios.get(`${baseUrl}/inventory/column-names`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default ApiRespository;
