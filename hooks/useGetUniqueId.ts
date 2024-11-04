import { useEffect, useState } from "react";
import DeviceInfo from "react-native-device-info";

export const useGetUniqueId = () => {
  const [uniqueId, setUniqueId] = useState("");

  useEffect(() => {
    const fetchUniqueId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setUniqueId(id);
    };

    fetchUniqueId();
  }, []);

  return uniqueId;
};
