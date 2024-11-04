import { API_URL, APPLICATION_ID, VITE_PRE_SHARED_KEY } from "@env";
import Base64 from "crypto-js/enc-base64";
import hmacSHA256 from "crypto-js/hmac-sha256";
import { getTabletUniqueIdHash, getToken } from "./user";

const useGenerateHeaders = async (sendToken?: boolean) => {
  const nonce = Date.now().toString() + (Math.random() * 1000000000).toFixed();

  const signature = Base64.stringify(hmacSHA256(nonce, VITE_PRE_SHARED_KEY));

  const token = await getToken();
  const tabletUniqueIdHash = await getTabletUniqueIdHash();

  return {
    Nonce: "test",
    Signature: "test",
    ApplicationId: APPLICATION_ID,
    TUI: tabletUniqueIdHash ?? "",
    Authorization: sendToken ? token ?? "" : "",
  };
};

export const apiCall = async (endpoint: string, options?: RequestInit) => {
  try {
    const headers = await useGenerateHeaders();
    console.log(headers);
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...options?.headers,
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
