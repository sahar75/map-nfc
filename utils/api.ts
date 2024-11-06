import { API_URL, APPLICATION_ID, PRE_SHARED_KEY } from "@env";
import Base64 from "crypto-js/enc-base64";
import hmacSHA256 from "crypto-js/hmac-sha256";
import { getTabletUniqueIdHash, getToken } from "./user";
import { handleApiErrors } from "./handleApiErrors";

export const useGenerateHeaders = async (sendToken?: boolean) => {
  const nonce = Date.now().toString() + (Math.random() * 1000000000).toFixed();

  const signature = Base64.stringify(hmacSHA256(nonce, PRE_SHARED_KEY));

  const token = await getToken();
  const tabletUniqueIdHash = await getTabletUniqueIdHash();

  return {
    Nonce: nonce,
    Signature: signature,
    ApplicationId: APPLICATION_ID,
    TUI: tabletUniqueIdHash ?? "",
    Authorization: sendToken ? token ?? "" : "",
  };
};

export const apiCall = async (
  endpoint: string,
  options?: RequestInit,
  sendToken?: boolean
) => {
  try {
    const headers = await useGenerateHeaders(sendToken);
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...options?.headers,
      },
    });
    if (!response.ok) {
      handleApiErrors(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
