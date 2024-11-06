import { router } from "expo-router";
import { setToken } from "./user";

export const handleApiErrors = async (response: Response) => {
  if (response.status === 401) {
    await setToken("");
    router.push("/");
  }
};
