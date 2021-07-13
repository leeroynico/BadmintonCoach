import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, ProgressBar, Colors } from "react-native-paper";
import { useFonts } from "expo-font";
//import CircleAnimated from "./CircleAnimated";
import { getRandom } from "./Logical";
import { Speak } from "./speech";
import { useInterval } from "./UseInterval";
import ModalEdit from "./modal/ModalEdit";

export default function Home(props) {
  const [loaded] = useFonts({
    Pangolin: require("../assets/fonts/Pangolin-Regular.ttf"),
  });

  const [icon, setIcon] = useState("play");
  const [start, setStart] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [secondsMax, setSecondsMax] = useState(60);
  const [randomNumber, setRandomNumber] = useState("");
  const [delai, setDelai] = useState(2500);
  const [activeModal, setActiveModal] = useState(false);

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
    <>
      <ModalEdit active={activeModal} />
      <View style={styles.container}>
        <Text style={styles.title}>Shadow Coach</Text>
        <Button
          icon={icon}
          mode="contained"
          style={styles.button}
          onPress={() => {
            seconds === "fin de la session" ? setSeconds(10) : "";
            if (start === "" || start === "pause") {
              train(getRandom(1, 7).toString());
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
        <Button
          style={styles.button}
          icon="reload"
          mode="contained"
          color="orange"
          onPress={() => {
            setStart("");
            setSeconds(60);
            setRandomNumber("");
            setIcon("play");
          }}
        >
          RESET
        </Button>
        <Button
          style={styles.button}
          icon="pencil"
          mode="contained"
          color="red"
          //todo : fix modal opening
          onPress={() => setActiveModal(!activeModal)}
        >
          EDIT TIME
        </Button>

        <ProgressBar
          style={styles.progress}
          progress={seconds / secondsMax}
          color={Colors.red800}
        />
        {/* <CircleAnimated /> */}
        {/* <Image
          source={{
            uri: "https://res.cloudinary.com/leeroynico/image/upload/v1624220380/half_court_czh7ni.png",
          }}
          style={{ width: 350, height: 350, marginTop: 10 }}
        /> */}
        <Text>{seconds}</Text>
        <Text>{randomNumber}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "Pangolin",
    fontSize: 30,
  },
  button: {
    height: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  progress: {
    height: 50,
    width: 300,
    borderRadius: 30,
    backgroundColor: "grey",
  },
});
