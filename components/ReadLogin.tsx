// import React, { useEffect } from "react";
// import { StyleSheet, View } from "react-native";
// import SimCardsManagerModule from "react-native-sim-cards-manager";

// // import NotificationComponent from "./NotificationComponent";

// function ReadLogin() {
//   //read sims info
//   useEffect(() => {
//     SimCardsManagerModule.getSimCards({
//       title: "App Permission",
//       message: "Custom message",
//       buttonNeutral: "Not now",
//       buttonNegative: "Not OK",
//       buttonPositive: "OK",
//     })
//       .then((array: Array<any>) => {
//         console.log("sims info", array);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return <View style={styles.wrapper}>{/* <NotificationComponent /> */}</View>;
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default ReadLogin;

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceInfo from "react-native-device-info";

const ReadLogin = () => {
  // const [isNfcEnabled, setIsNfcEnabled] = useState(false);
  // const [tagInfo, setTagInfo] = useState<TagEvent | null>(null);
  const [id, setId] = useState("");

  // useEffect(() => {
  //   NfcManager.start();

  //   const checkNfcAvailability = async () => {
  //     const isSupported = await NfcManager.isSupported();
  //     setIsNfcEnabled(isSupported);
  //   };

  //   checkNfcAvailability();

  //   return () => {
  //     NfcManager.close();
  //     NfcManager.cancelTechnologyRequest();
  //     NfcManager.clearBackgroundTag();
  //   };
  // }, []);

  // const readNfc = async () => {
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     const tag = await NfcManager.getTag();
  //     console.log("Tag found", tag);
  //     setTagInfo(tag); // You can modify this to parse finer details
  //     Alert.alert("NFC Tag", JSON.stringify(tag, null, 2)); // Alert showing the tag info
  //   } catch (ex) {
  //     Alert.alert("Error", "Failed to read NFC tag. Please try again.");
  //     console.warn(ex);
  //   } finally {
  //     NfcManager.close();
  //     NfcManager.cancelTechnologyRequest();
  //     NfcManager.clearBackgroundTag();
  //   }
  // };

  useEffect(() => {
    const fetchUniqueId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setId(id);
      console.log(id);
    };

    fetchUniqueId();
  }, []);

  return (
    <View style={styles.container}>
      <Text className="mb-10">
        device unique id :::{" "}
        <Text className="font-bold text-lime-600 text-2xl">{id}</Text>
      </Text>
      {/* <Text style={styles.title}>NFC Reader</Text>
      {isNfcEnabled ? (
        <TouchableOpacity style={styles.button} onPress={readNfc}>
          <Text style={styles.buttonText}>Scan NFC Tag</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.warning}>NFC is not supported on this device.</Text>
      )}
      {tagInfo && (
        <View style={styles.tagInfoContainer}>
          <Text style={styles.infoText}>Tag Info:</Text>
          <Text style={styles.infoText}>
            {JSON.stringify(tagInfo, null, 2)}
          </Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  // title: {
  //   fontSize: 24,
  //   marginBottom: 20,
  // },
  // button: {
  //   backgroundColor: "#007AFF",
  //   padding: 15,
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 18,
  // },
  // warning: {
  //   color: "red",
  //   marginTop: 20,
  // },
  // tagInfoContainer: {
  //   marginTop: 20,
  //   padding: 10,
  //   borderColor: "gray",
  //   borderWidth: 1,
  //   width: "100%",
  // },
  // infoText: {
  //   fontSize: 16,
  // },
});

export default ReadLogin;
