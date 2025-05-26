import { apiRequest } from "@/services/APIHelper";

export const fetchMenu = async () => {
  try {
    const result = await apiRequest({ url: `/api/satker/all` });
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const fetchUser = async () => {
  try {
    const result = await apiRequest({ url: `/api/user/me` });
    return result;
  } catch (error) {
    console.error(error);
  }
};
