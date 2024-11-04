import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useGetUniqueId } from "../hooks/useGetUniqueId";
import { useGenerateHash } from "../hooks/queries/useGenerateHash";
import { encryptTabletId } from "../utils/encryptTabletId";
import { setTabletUniqueIdHash } from "../utils/user";

const LoginQrCode = () => {
  const uniqueId = useGetUniqueId();
  const {
    data: qrCodeValue,
    isError,
    isFetching,
    isLoading,
    isPending,
  } = useGenerateHash();

  const [timer, setTimer] = useState(1200); // 20 minutes in seconds

  const loading = isFetching || isLoading || isPending;

  const renderQrCode = () => {
    switch (true) {
      case loading:
        return <Text>Loading...</Text>;
      case isError:
        return <Text>Error in fetching QR Code!</Text>;

      default:
        return <QRCode value={qrCodeValue} size={200} />;
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
    if (qrCodeValue) {
      setTimer(1200); // Reset timer to 20 minutes

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0; // Stop the timer at 0
          }
          return prev - 1; // Decrement timer
        });
      }, 1000); // Update timer every second

      return () => clearInterval(interval); // Cleanup on unmount or when qrCodeValue changes
    }
  }, [qrCodeValue]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <View className="items-center">
      <Text className="mb-6 text-lg">Scan QR Code for login</Text>
      {renderQrCode()}
      {qrCodeValue && (
        <Text className="mt-4 text-lg">
          Time Remaining: {formatTime(timer)}
        </Text>
      )}
    </View>
  );
};

export default LoginQrCode;
