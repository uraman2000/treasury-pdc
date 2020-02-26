const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const EXPIRES_IN = "EXPIRES_IN";
const ROLE = "ROLE";

interface Access {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  role: string;
}

export const setAccess = (value: Access) => {
  localStorage.setItem(ACCESS_TOKEN, value.access_token);
  localStorage.setItem(REFRESH_TOKEN, value.refresh_token);
  localStorage.setItem(EXPIRES_IN, value.expires_in);
  localStorage.setItem(ROLE, value.role);
};

export const deleteAccess = () => {
  localStorage.clear();
};

export const getAccess = () => {
  return {
    access_token: localStorage.getItem(ACCESS_TOKEN),
    expires_in: localStorage.getItem(EXPIRES_IN),
    refresh_token: localStorage.getItem(REFRESH_TOKEN),
    role: localStorage.getItem(ROLE)
  };
};

export const localDate = (date: any) => new Date(date).toLocaleDateString();

export const today = () => new Date().toLocaleDateString();

export const agingDate = (fromDate: string, toDate: string) => {
  const fd: any = new Date(fromDate).getTime();
  const td: any = new Date(toDate).getTime();

  return Math.round((fd - td) / (1000 * 3600 * 24)).toString();
};
