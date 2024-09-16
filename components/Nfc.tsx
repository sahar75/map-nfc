import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import SimCardsManagerModule from "react-native-sim-cards-manager";

// Pre-step, call this before any NFC operations
NfcManager.start();

function Nfc() {
  const [scan, setScan] = useState(false);

  async function readNdef() {
    try {
      setScan(true);
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn("Tag found", tag);
      router.push("/map");
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      setScan(false);
    }
  }

  useEffect(() => {
    SimCardsManagerModule.getSimCards({
      title: "App Permission",
      message: "Custom message",
      buttonNeutral: "Not now",
      buttonNegative: "Not OK",
      buttonPositive: "OK",
    })
      .then((array: Array<any>) => {
        console.log(array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>{scan ? "Scanning..." : "Scan a Tag"}</Text>
      </TouchableOpacity>
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

export default Nfc;
