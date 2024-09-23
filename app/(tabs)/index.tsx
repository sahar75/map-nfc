import React from "react";
import { StyleSheet, View } from "react-native";
import Nfc from "../../components/Nfc";

export default function App() {
  return (
    <View style={styles.container}>
      <Nfc />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
