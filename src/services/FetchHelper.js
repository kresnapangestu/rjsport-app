export async function fetchHelper(url, method, body ) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify({ ...body }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function fetchHelperGET(url, method, token, ) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, //
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
