import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import StopWatch from "./StopWatch";
import { useFonts } from "expo-font";
import CircleAnimated from "./CircleAnimated";
import { getRandom } from "./Logical";
import { Speak } from "./speech";

export default function Home(props) {
  const [loaded] = useFonts({
    Pangolin: require("../assets/fonts/Pangolin-Regular.ttf"),
  });

  const [icon, setIcon] = useState("play");
  const [playState, setPlayState] = useState(false);

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
          Speak(getRandom(1, 7).toString());
          setTimeout(function () {
            alert("yo");
          }, 2000);
          icon === "play" ? setIcon("pause") : setIcon("play");
        }}
      >
        {icon}
      </Button>
      {/* <CircleAnimated /> */}
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
