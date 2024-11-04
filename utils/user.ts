import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const setTabletUniqueIdHash = async (
  tabletUniqueIdHash: string
): Promise<void> => {
  await SecureStore.setItemAsync("tabletUniqueIdHash", tabletUniqueIdHash);
};

const setToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync("userToken", token);
};

const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync("userToken");
};

const getTabletUniqueIdHash = async (): Promise<string | null> => {
  return "6721ea5caa291f974a7dcf81";
  return await SecureStore.getItemAsync("tabletUniqueIdHash");
};

const setUserHash = async (hash: string): Promise<void> => {
  await SecureStore.setItemAsync("userHash", hash);
};

const getUserHash = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync("userHash");
};

// Exporting the functions
export {
  setTabletUniqueIdHash,
  setToken,
  getToken,
  getTabletUniqueIdHash,
  setUserHash,
  getUserHash,
};
