import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import SimCardsManagerModule from "react-native-sim-cards-manager";
import NotificationComponent from "./NotificationComponent";

function ReadLogin() {
  //read sims info
  useEffect(() => {
    SimCardsManagerModule.getSimCards({
      title: "App Permission",
      message: "Custom message",
      buttonNeutral: "Not now",
      buttonNegative: "Not OK",
      buttonPositive: "OK",
    })
      .then((array: Array<any>) => {
        console.log("sims info", array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      <NotificationComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReadLogin;
