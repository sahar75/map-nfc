import { API_URL } from "@env";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { login } from "../api/login";
import { urls } from "../config/urls";
import { useUserStore } from "../store/user";
import { useGenerateHeaders } from "../utils/api";
import { handleApiErrors } from "../utils/handleApiErrors";
import { setToken } from "../utils/user";

const NotificationComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const loginConnection = useRef<any>(null);
  const logoutConnection = useRef<any>(null);
  const { userHash, setUserHash } = useUserStore();
  const {
    mutate: loginMutate,
    data: loginData,
    reset,
  } = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    async onSuccess(data) {
      await setToken(data.access_token);
      router.push("/map");
    },
  });

  useEffect(() => {
    if (userHash) {
      const ReceiveLoginNotification = async () => {
        const headers = await useGenerateHeaders();
        // Create a connection to the SignalR Hub
        loginConnection.current = new HubConnectionBuilder()
          .withUrl(`${API_URL}${urls.loginNotifyHub}`, { headers })
          .build();

        // Start the connection
        loginConnection.current
          .start()
          .then(() => console.log("Connected to Login Hub"))
          .catch((err: Error) => {
            console.error("Connection error:", err);
          });

        // Handle receiving notifications from the hub
        loginConnection.current.on(
          "ReceiveLoginNotification",
          (message: string) => {
            if (message === userHash) {
              setMessage("you are logged in");
              loginMutate(message);
            }
          }
        );
      };

      ReceiveLoginNotification();

      // Clean up connection on unmount
    } else {
      loginConnection?.current?.stop();
    }
    return () => {
      loginConnection?.current?.stop();
    };
  }, [userHash]);

  useEffect(() => {
    if (loginData) loginConnection?.current?.stop();
  }, [loginData]);

  useEffect(() => {
    if (loginData) {
      const ReceiveLogoutNotification = async () => {
        const headers = await useGenerateHeaders(true);
        // Create a connection to the SignalR Hub
        logoutConnection.current = new HubConnectionBuilder()
          .withUrl(`${API_URL}${urls.logoutNotifyHub}`, { headers })
          .build();

        // Start the connection
        logoutConnection.current
          .start()
          .then(() => console.log("Connected to Logout Hub"))
          .catch((err: Error) => {
            console.error("Connection error:", err);
          });

        // Handle receiving notifications from the hub
        logoutConnection.current.on(
          "ReceiveLogoutNotification",
          async (message: string) => {
            if (message === userHash) {
              await setToken("");
              setUserHash("");
              reset();
              logoutConnection?.current?.stop();
              router.push("/");
            }
          }
        );
      };

      ReceiveLogoutNotification();
    } else {
      logoutConnection?.current?.stop();
    }
  }, [loginData]);

  return (
    <View style={{ alignItems: "center" }}>
      {message ? <Text>{message}</Text> : <Text>wait for login...</Text>}
    </View>
  );
};

export default NotificationComponent;
