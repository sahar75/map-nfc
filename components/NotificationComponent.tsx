import { API_URL } from "@env";
import {
  HubConnection,
  HubConnectionBuilder,
  MessageHeaders,
} from "@microsoft/signalr";
import { useMutation, useMutationState } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { login } from "../api/login";
import { urls } from "../config/urls";
import { useUserStore } from "../store/user";
import { useGenerateHeaders } from "../utils/api";
import { setToken } from "../utils/user";
import { useGenerateHash } from "../hooks/queries/useGenerateHash";

const NotificationComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [retrying, setRetrying] = useState<boolean>(false);
  const loginConnection = useRef<HubConnection | null>(null);
  const logoutConnection = useRef<HubConnection | null>(null);
  const { userHash, setUserHash, isLogin, setIsLogin } = useUserStore();
  console.log("isLogin", isLogin);
  const isLoginRef = useRef(isLogin);
  const mutationState = useMutationState();
  const { reset: resetQrCode } = useGenerateHash();
  const {
    mutate: loginMutate,
    data: loginData,
    reset,
  } = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    async onSuccess(data) {
      await setToken(data.access_token);
      resetQrCode();
      setIsLogin(true);
      router.push("/map");
    },
  });

  const logout = async () => {
    setUserHash("");
    reset();
    setIsLogin(false);
    logoutConnection?.current?.stop();
    await setToken("");
    router.push("/");
  };

  // Function to start the SignalR connection with retry logic
  const startConnection = async (
    connectionRef: React.MutableRefObject<HubConnection | null>,
    url: string,
    headers: MessageHeaders,
    type: "login" | "logout"
  ) => {
    if (connectionRef)
      try {
        console.log({ connectionRef, url, headers, type });
        connectionRef.current = new HubConnectionBuilder()
          .withUrl(url, { headers })
          .build();

        await connectionRef.current.start();
        console.log(`Connected to SignalR Hub ${type}`);

        if (type === "logout")
          connectionRef?.current?.on(
            "ReceiveLogoutNotification",
            async (message: string) => {
              if (message === userHash) {
                logout();
              }
            }
          );

        setIsConnected(true);
        setRetrying(false);
      } catch (error: any) {
        if (error?.message.includes("Status code '401'")) {
          logout();
        } else {
          console.error("Connection failed, retrying in 5 seconds", error);
          setIsConnected(false);
          setRetrying(true);
          setTimeout(
            () => startConnection(connectionRef, url, headers, type),
            5000
          );
        }
      }
  };

  useEffect(() => {
    isLoginRef.current = isLogin;
  }, [isLogin]);

  useEffect(() => {
    if (userHash && !isLogin) {
      const ReceiveLoginNotification = async () => {
        const headers = await useGenerateHeaders();
        await startConnection(
          loginConnection,
          `${API_URL}${urls.loginNotifyHub}`,
          headers,
          "login"
        );

        loginConnection?.current?.on(
          "ReceiveLoginNotification",
          (message: string) => {
            if (message === userHash) {
              setMessage("you are logged in");
              loginMutate(message);
            }
          }
        );

        loginConnection?.current?.onclose((error) => {
          if (!isLoginRef.current)
            setTimeout(() => {
              setUserHash("");
            }, 1000);
        });
      };

      ReceiveLoginNotification();
    } else {
      loginConnection?.current?.stop();
    }
    return () => {
      loginConnection?.current?.stop();
    };
  }, [userHash]);

  useEffect(() => {
    if (loginData) {
      loginConnection?.current?.stop();
      if (typeof mutationState?.[0]?.data === "string")
        setUserHash(mutationState?.[0]?.data);
    }
  }, [loginData]);
  console.log("userHash", userHash);

  useEffect(() => {
    if (isLoginRef.current) {
      const ReceiveLogoutNotification = async () => {
        const headers = await useGenerateHeaders(true);
        // Create a connection to the SignalR Hub
        await startConnection(
          logoutConnection,
          `${API_URL}${urls.logoutNotifyHub}`,
          headers,
          "logout"
        );

        logoutConnection?.current?.onclose(async (error) => {
          console.log("isLoginRef.current", isLoginRef.current);
          if (isLoginRef.current) {
            if (error?.message.includes("Status code '401'")) {
              logout();
            } else {
              console.error("Connection failed, retrying in 5 seconds", error);
              setIsConnected(false);
              setRetrying(true);
              setTimeout(
                () =>
                  startConnection(
                    logoutConnection,
                    `${API_URL}${urls.logoutNotifyHub}`,
                    headers,
                    "logout"
                  ),
                5000
              );
            }
          }
        });
      };

      ReceiveLogoutNotification();
    } else {
      logoutConnection?.current?.stop();
    }
  }, [isLoginRef.current]);

  return (
    <View style={{ alignItems: "center" }}>
      {message ? <Text>{message}</Text> : <Text>wait for login...</Text>}
      {retrying && <Text>Attempting to reconnect...</Text>}
    </View>
  );
};

export default NotificationComponent;
