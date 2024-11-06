import React, { useEffect, useState } from "react";
import { Text } from "react-native";

interface ITimerProps {
  qrCodeValue: string;
  reset: () => void;
}

const seconds = 1200; // 20 minutes in seconds

const Timer: React.FC<ITimerProps> = ({ qrCodeValue, reset }) => {
  const [timer, setTimer] = useState(seconds);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (qrCodeValue) {
      setTimer(seconds);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimer(0);
    }
  }, [qrCodeValue]);

  useEffect(() => {
    if (!timer) {
      reset();
    }
  }, [timer]);

  return (
    <Text className="mt-6 text-xs text-[#B0B0B0]">
      Time Remaining:{" "}
      <Text className="text-lg text-[#5251FA] font-bold">
        {formatTime(timer)}
      </Text>
    </Text>
  );
};

export default Timer;
