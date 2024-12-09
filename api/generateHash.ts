import { nativeBuildVersion } from "expo-application";
import { urls } from "../config/urls";
import { apiCall } from "../utils/api";
import { CLIENT_ID, CLIENT_SECRET } from "@env";

export const generateHash = async () => {
  try {
    const response = await apiCall(urls.generateHash, {
      method: "POST",
      body: JSON.stringify({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        tabletVersion: nativeBuildVersion,
      }),
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
