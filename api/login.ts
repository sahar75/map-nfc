import { urls } from "../config/urls";
import { apiCall } from "../utils/api";
import { CLIENT_ID, CLIENT_SECRET } from "@env";

export const login = async (hash: string) => {
  try {
    const response = await apiCall(urls.login, {
      method: "POST",
      body: JSON.stringify({
        hash,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      }),
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
