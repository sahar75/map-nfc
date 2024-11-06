import { StyleSheet, View } from "react-native";
import LoginQrCode from "../../components/LoginQrCode";
import NotificationComponent from "../../components/NotificationComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginQrCode />
      <NotificationComponent />
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
