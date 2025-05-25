import { toast } from "react-toastify";

export async function apiRequest(urls, method = "GET", options = {}) {
  const url = process.env.REACT_APP_API_BASE_URL + urls;
  const defaultToken =
    //user
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5yb2tldWJtbi1wYS5pZC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTc0ODE4NTE0MCwiZXhwIjoxNzc5NzIxMTQwLCJuYmYiOjE3NDgxODUxNDAsImp0aSI6InRSUXNsNDBZVWpjTHRqeEciLCJzdWIiOiI2ODMzMmZmNjM5Zjc2OTk1NzAwMzA5N2MiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.yOPz_od9pDSECF6PHQEgIpN78_sItRt6Gt5657HHKnk";
    //admin
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5yb2tldWJtbi1wYS5pZC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTc0ODE4NTE4OCwiZXhwIjoxNzc5NzIxMTg4LCJuYmYiOjE3NDgxODUxODgsImp0aSI6IkpSOGJtQXdtQVBuTDhqcmgiLCJzdWIiOiI2ODMzMzAxNzAxMDY3N2E0YjIwNDM1YWMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.pvxsuZwrNgkuFbayrsmbWaTASEt6jteJ-sEEU6SfOIc";
  const { body } = options;
  const token = options.token || defaultToken;

  if (!url || typeof url !== "string") {
    toast.error("Invalid API URL");
    throw new Error("Invalid URL");
  }

  console.log(!(options.body instanceof FormData) && "application/json");

  try {
    const headers = {
      "Content-Type": !(options.body instanceof FormData) && "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
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
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`[API ERROR]: ${method} ${url}`, error.message);
    toast.error(error.message || "Something went wrong");
    throw error;
  }
}
