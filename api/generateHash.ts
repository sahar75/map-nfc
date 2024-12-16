import { CLIENT_ID, CLIENT_SECRET } from "@env";
import { nativeApplicationVersion } from "expo-application";
import { urls } from "../config/urls";
import { apiCall } from "../utils/api";

export const generateHash = async () => {
  try {
    const response = await apiCall(urls.generateHash, {
      method: "POST",
      body: JSON.stringify({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        tabletVersion: Number(
          nativeApplicationVersion?.replaceAll(".", "")
        ).toString(),
      }),
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
