import { StyleSheet, Text, View } from "react-native";
import Nfc from "../../components/Nfc";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>test</Text>
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
