import { urls } from "../config/urls";
import { apiCall } from "../utils/api";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import { getUserHash, setUserHash } from "../utils/user";

export const generateHash = async () => {
  const userHash = await getUserHash();
  if (userHash) return userHash;
  try {
    const response = await apiCall(urls.generateHash, {
      method: "POST",
      body: JSON.stringify({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      }),
    });
    setUserHash(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
