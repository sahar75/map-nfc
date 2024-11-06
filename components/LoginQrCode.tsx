import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useGenerateHash } from "../hooks/queries/useGenerateHash";
import { useGetUniqueId } from "../hooks/useGetUniqueId";
import { useUserStore } from "../store/user";
import { encryptTabletId } from "../utils/encryptTabletId";
import { setTabletUniqueIdHash } from "../utils/user";
import Timer from "./Timer";

const LoginQrCode = () => {
  const uniqueId = useGetUniqueId();
  const { setUserHash, userHash } = useUserStore();
  const {
    data: qrCodeValue,
    isError,
    isPending,
    mutate: generateHash,
    reset,
  } = useGenerateHash();

  console.log("userHash", userHash);

  const renderQrCode = () => {
    switch (true) {
      case isPending:
        return <Text className="mb-4">Loading...</Text>;
      case isError:
        return <Text className="mb-4">Error in fetching QR Code!</Text>;

      case Boolean(userHash):
        return (
          <>
            <Text className="mb-8 text-xl font-bold text-[#5932EA]">
              Scan QR Code to login
            </Text>
            <QRCode value={userHash} size={200} />
          </>
        );

      default:
        return (
          <Pressable
            onPress={() => generateHash()}
            className="bg-[#5932EA] p-4 rounded-xl mb-4"
          >
            <Text className="text-white font-medium">
              Get QR Code for login
            </Text>
          </Pressable>
        );
    }
  };

  useEffect(() => {
    if (uniqueId) {
      const fetchTabletUniqueIdHash = async () => {
        const tabletUniqueIdHash = await encryptTabletId(uniqueId);
        setTabletUniqueIdHash(tabletUniqueIdHash);
      };

      fetchTabletUniqueIdHash();
    }
  }, [uniqueId, setTabletUniqueIdHash]);

  useEffect(() => {
    setUserHash(qrCodeValue);
  }, [qrCodeValue]);

  return (
    <View className="items-center">
      {renderQrCode()}
      {Boolean(userHash) && <Timer reset={reset} qrCodeValue={userHash} />}
    </View>
  );
};

export default LoginQrCode;
