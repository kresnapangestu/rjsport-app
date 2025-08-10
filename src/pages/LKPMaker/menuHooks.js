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

export function sumQty(arr) {
  return arr.reduce((total, item) => total + Number(item.qty), 0);
}

export function sumPrice(arr) {
  return arr.reduce(
    (total, item) => total + Number(item.price) * Number(item.qty),
    0
  );
}
