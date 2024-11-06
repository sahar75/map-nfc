import { useMutation } from "@tanstack/react-query";
import { generateHash } from "../../api/generateHash";

export const useGenerateHash = () => {
  return useMutation({
    mutationKey: ["loginQrCode"],
    mutationFn: () => generateHash(),
  });
};
