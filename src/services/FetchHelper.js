export async function fetchHelper(url, method, body) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
}
