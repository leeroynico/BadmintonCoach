import React, { useState, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { useFonts } from "expo-font";
import { getRandom } from "./Logical";
import { Speak } from "./speech";
import { useInterval } from "./UseInterval";
import ModalEdit from "./modal/ModalEdit";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Button, Icon, Text, LinearProgress } from "react-native-elements";

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const [loaded] = useFonts({
    Pangolin: require("../assets/fonts/Pangolin-Regular.ttf"),
    Kanit: require("../assets/fonts/Kanit-Regular.ttf"),
  });

  const [icon, setIcon] = useState("play-circle");
  const [start, setStart] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [secondsMax, setSecondsMax] = useState(60);
  const [randomNumber, setRandomNumber] = useState("");
  const [delai, setDelai] = useState(3000);
  const [activeModal, setActiveModal] = useState(false);

  const train = (number) => {
    setRandomNumber(number);
    Speak(number);
  };

  useInterval(() => {
    if (start === "run") {
      if (seconds > 0) {
        train(getRandom(1, 7).toString());
        fadeIn();
        setTimeout(fadeOut, 1000);
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

  return (
    <>
      <ModalEdit
        active={activeModal}
        setSeconds={setSeconds}
        seconds={seconds}
        delai={delai}
        setDelai={setDelai}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Shadow Coach</Text>

        <Icon
          type="font-awesome"
          name={icon}
          size={55}
          color="#db3a34"
          onPress={() => {
            seconds === "fin de la session" ? setSeconds(10) : "";
            if (start === "") {
              Speak("c'est parti ");
              setStart("run");
              setIcon("pause-circle");
            } else if (start === "pause") {
              setStart("run");
              setIcon("pause-circle");
            } else if (start === "run") {
              setIcon("play-circle");
              setStart("pause");
            }
          }}
        />
        <Button
          icon={
            <Icon
              name="reload-outline"
              type="ionicon"
              color="white"
              size={20}
            />
          }
          buttonStyle={{
            height: 40,
            backgroundColor: "#537d8d",
            marginTop: 10,
          }}
          iconRight
          title=" RESET "
          onPress={() => {
            setStart("");
            setSeconds(60);
            setRandomNumber("");
            setIcon("play-circle");
          }}
        />
        <Button
          icon={
            <Icon
              name="create-outline"
              type="ionicon"
              color="white"
              size={20}
            />
          }
          buttonStyle={{
            height: 40,
            backgroundColor: "#db3a34",
            marginTop: 10,
          }}
          iconRight
          title=" EDIT "
          onPress={() => setActiveModal(!activeModal)}
        />

        <LinearProgress
          variant="determinate"
          value={typeof seconds === "number" ? seconds / secondsMax : 0}
          color="#537d8d"
          style={styles.progress}
        />

        {/* <Image
          source={{
            uri: "https://res.cloudinary.com/leeroynico/image/upload/v1624220380/half_court_czh7ni.png",
          }}
          style={{ width: 350, height: 150, marginTop: 10 }}
        /> */}

        <Text h4 style={styles.textChrono}>
          {seconds} / {secondsMax} sec
        </Text>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => setSeconds(value)}
          items={[
            { key: "40", label: "40", value: "40" },
            { key: "50", label: "50", value: "50" },
            { key: "60", label: "60", value: "60" },
            { key: "70", label: "70", value: "70" },
            { key: "80", label: "80", value: "80" },
          ]}
          placeholder={{
            label: "choix temps",
            value: "",
          }}
          style={styles.select}
        />
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text h1 style={{ color: "#f0e7d8", marginTop: 50 }}>
            {randomNumber}
          </Text>
        </Animated.View>
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
    fontFamily: "Kanit",
    fontSize: 30,
    color: "#f0e7d8",
  },
  progress: {
    marginTop: 20,
    height: 50,
    width: 300,
    borderRadius: 30,
  },
  textChrono: {
    color: "#f0e7d8",
    marginTop: -41,
    fontFamily: "Kanit",
    marginBottom: 40,
  },
  select: {
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "red",
  },
});
