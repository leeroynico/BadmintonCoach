import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import StopWatch from "./StopWatch";
import * as Speech from "expo-speech";

export default function Home() {
  const speak = () => {
    const thingToSay = "Attention, préparez vous ";
    Speech.speak(thingToSay, {
      voice: "com.apple.ttsbundle.Amelie-compact",
      language: "fr-FR",
      pitch: 1.3,
      rate: 1,
    });
    try {
      let voicesList = Speech.getAvailableVoicesAsync();
      voicesList.then((value) => {
        //console.log(value);
        console.log(
          value.filter((x) => {
            return x.language.includes("fr");
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button
        icon="play"
        mode="contained"
        onPress={() => {
          speak();
        }}
      >
        Start
      </Button>
      <StopWatch />
    </View>
  );
}
