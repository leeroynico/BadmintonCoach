import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import StopWatch from "./StopWatch";
import * as Speech from "expo-speech";
import { useFonts } from "expo-font";

export default function Home() {
  const [loaded] = useFonts({
    Pangolin: require("../assets/fonts/Pangolin-Regular.ttf"),
  });

  const [icon, setIcon] = useState("play");
  const [playState, setPlayState] = useState(false);

  const speak = () => {
    const thingToSay = "Attention, préparez vous";
    Speech.speak(thingToSay, {
      voice: "com.apple.ttsbundle.Amelie-compact",
      language: "fr-FR",
      pitch: 1.3,
      rate: 1,
    });
    //for get all voices available
    // try {
    //   let voicesList = Speech.getAvailableVoicesAsync();
    //   voicesList.then((value) => {

    //     console.log(
    //       value.filter((x) => {
    //         return x.language.includes("fr");
    //       })
    //     );
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Text style={styles.Title}>Shadow Coach</Text>
      <Button
        icon={icon}
        mode="contained"
        onPress={() => {
          speak();
          icon === "play" ? setIcon("pause") : setIcon("play");
        }}
      >
        {icon}
      </Button>
      <Image
        source={{
          uri: "https://res.cloudinary.com/leeroynico/image/upload/v1624220380/half_court_czh7ni.png",
        }}
        style={{ width: 350, height: 350, marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Title: {
    fontFamily: "Pangolin",
    fontSize: 30,
    marginLeft: "20%",
  },
});
