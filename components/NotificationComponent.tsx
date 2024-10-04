import { HubConnectionBuilder } from "@microsoft/signalr";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { handleApiErrors } from "../utils/handleApiErrors";

const NotificationComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const connection = useRef<any>(null);

  useEffect(() => {
    // Create a connection to the SignalR Hub
    connection.current = new HubConnectionBuilder()
      .withUrl("http://95.80.185.73:5167/hubs/notification")
      .build();

    // Start the connection
    connection.current
      .start()
      .then(() => console.log("Connected to Notification Hub"))
      .catch((err: Error) => {
        console.error("Connection error:", err);
        handleApiErrors();
      });

    // Handle receiving notifications from the hub
    connection.current.on("LoadNotification", (messages: string[]) => {
      setMessages(messages);
    });

    // Clean up connection on unmount
    return () => {
      connection.current.stop();
    };
  }, []);

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      {messages.length ? (
        <>
          <Text style={{ marginVertical: 40 }}>
            {messages.join("\n").toString()}
          </Text>
          <Link href="/map">Go Home</Link>
        </>
      ) : (
        <Text>wait for login...</Text>
      )}
    </View>
  );
};

export default NotificationComponent;
