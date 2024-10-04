import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ReadLogin from "./components/ReadLogin";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ReadLogin />
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
