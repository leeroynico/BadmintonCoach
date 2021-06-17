import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import StopWatch from "./StopWatch";

export default function Home() {
  const speak = (message) => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = message;
    let voices = window.speechSynthesis.getVoices();
    msg.lang = "fr-CA";
    msg.voice = voices[4];
    window.speechSynthesis.speak(msg);
    console.log(voices.lang);
  };

  const RandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <View>
      <Button
        icon="play"
        mode="contained"
        onPress={() => speak("salut tout le monde ")}
      >
        Start
      </Button>
      <StopWatch />
    </View>
  );
}
