import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import SimCardsManagerModule from "react-native-sim-cards-manager";

function ReadLogin() {
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
      <Text>wait for login...</Text>
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
