import { urls } from "../config/urls";
import { apiCall } from "../utils/api";

export const testApi = async () => {
  try {
    const response = await apiCall(
      urls.test,
      {
        method: "POST",
      },
      true
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
