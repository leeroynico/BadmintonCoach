import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import ProgressBar from "react-native-animated-progress";
//import StopWatch from "./StopWatch";
import { useFonts } from "expo-font";
//import CircleAnimated from "./CircleAnimated";
import { getRandom } from "./Logical";
import { Speak } from "./speech";
import { useInterval } from "./UseInterval";
let chrono = null;
let shadow = null;
export default function Home(props) {
  const [loaded] = useFonts({
    Pangolin: require("../assets/fonts/Pangolin-Regular.ttf"),
  });

  const [icon, setIcon] = useState("play");
  const [start, setStart] = useState("");
  const [seconds, setSeconds] = useState(10);
  const [randomNumber, setRandomNumber] = useState("");
  const [delai, setDelai] = useState(2500);

  const train = (number) => {
    setRandomNumber(number);
    Speak(number);
  };

  useInterval(() => {
    if (start === "run") {
      if (seconds > 0) {
        train(getRandom(1, 7).toString());
      }
    } else {
      ("");
    }
  }, delai);

  useInterval(() => {
    if (start === "run") {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setSeconds("fin de la session");
        setIcon("play");
        setStart("");
        Speak("c'est fini");
      }
    } else {
      ("");
    }
  }, 1000);

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Text style={styles.Title}>Shadow Coach</Text>
      <Button
        icon={icon}
        mode="contained"
        style={styles.Button}
        onPress={() => {
          seconds === "fin de la session" ? setSeconds(10) : "";
          if (start === "" || start === "pause") {
            setStart("run");
            setIcon("pause");
          } else if (start === "run") {
            setIcon("play");
            setStart("pause");
          }
        }}
      >
        {icon}
      </Button>
      <ProgressBar
        progress={typeof seconds === "number" ? seconds * 10 : 100}
        height={10}
        backgroundColor="#4a0072"
        animated={true}
        trackColor="#595959"
      />
      <Button
        style={styles.Button}
        icon="load"
        mode="contained"
        color="orange"
        onPress={() => {
          setStart("");
          setSeconds(10);
        }}
      >
        RESET
      </Button>
      {/* <CircleAnimated /> */}
      <Image
        source={{
          uri: "https://res.cloudinary.com/leeroynico/image/upload/v1624220380/half_court_czh7ni.png",
        }}
        style={{ width: 350, height: 350, marginTop: 10 }}
      />
      <Text>{seconds}</Text>
      <Text>{randomNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Title: {
    fontFamily: "Pangolin",
    fontSize: 30,
    marginLeft: "20%",
  },
  Button: {
    height: 40,
    marginBottom: 10,
  },
});
