import LoginApiRepository from "../Library/LoginApiRepository";
import { ResponseCodes } from "../Constatnt";

const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const EXPIRES_IN = "EXPIRES_IN";

interface Access {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

export const login = (value: Access) => {
  localStorage.setItem(ACCESS_TOKEN, value.access_token);
  localStorage.setItem(REFRESH_TOKEN, value.refresh_token);
  localStorage.setItem(EXPIRES_IN, value.expires_in);
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(EXPIRES_IN);
};

export const getAccess = () => {
  return {
    access_token: localStorage.getItem(ACCESS_TOKEN),
    expires_in: localStorage.getItem(EXPIRES_IN),
    refresh_token: localStorage.getItem(REFRESH_TOKEN)
  };
};

export const isLogin = (status: number) => {
  return status != ResponseCodes.Unauthorized;
};
