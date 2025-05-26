import { toast } from "react-toastify";

export async function apiRequest({
  url,
  method = "GET",
  options = {},
  isMultiType = false,
}) {
  const path = process.env.REACT_APP_API_BASE_URL + url;
  const defaultToken = localStorage.getItem("token");
  const { body } = options;
  const token = options.token || defaultToken;

  if (!path || typeof path !== "string") {
    toast.error("Invalid API URL");
    throw new Error("Invalid URL");
  }

  try {
    const headers = !isMultiType
      ? {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        }
      : {
          ...(token && { Authorization: `Bearer ${token}` }),
        };

    const response = await fetch(path, {
      method,
      headers,
      ...(body && {
        body:
          options.body instanceof FormData
            ? options.body
            : JSON.stringify(options.body),
      }),
    });

    const isJSON = response.headers
      .get("content-type")
      ?.includes("application/json");

    const data = isJSON ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage =
        typeof data === "string" ? data : data?.message || "Request failed";
      toast.error(errorMessage);
      if (errorMessage === "Token is Expired") {
        const navigate = (path) => {
          window.location.href = path;
        };
        navigate("/");
        localStorage.removeItem("token");
      }
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`[API ERROR]: ${method} ${path}`, error.message);
    toast.error(error.message || "Something went wrong");
    throw error;
  }
}
