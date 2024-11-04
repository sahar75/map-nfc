import { useQuery } from "@tanstack/react-query";
import { generateHash } from "../../api/generateHash";

export const useGenerateHash = () => {
  return useQuery({
    queryKey: ["loginQrCode"],
    queryFn: () => generateHash(),
    // refetchInterval: 72000000, // get qrcode every 20 min
  });
};
