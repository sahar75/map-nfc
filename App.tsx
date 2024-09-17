import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Nfc from "./components/Nfc";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
