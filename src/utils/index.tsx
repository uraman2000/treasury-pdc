const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const EXPIRES_IN = "EXPIRES_IN";

interface Access {
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

export const setAccess = (value: Access) => {
  localStorage.setItem(ACCESS_TOKEN, value.access_token);
  localStorage.setItem(REFRESH_TOKEN, value.refresh_token);
  localStorage.setItem(EXPIRES_IN, value.expires_in);
};

export const deleteAccess = () => {
  localStorage.clear();
};

export const getAccess = () => {
  return {
    access_token: localStorage.getItem(ACCESS_TOKEN),
    expires_in: localStorage.getItem(EXPIRES_IN),
    refresh_token: localStorage.getItem(REFRESH_TOKEN)
  };
};
