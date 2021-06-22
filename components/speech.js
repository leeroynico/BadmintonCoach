import * as Speech from "expo-speech";

export function Speak(message) {
  Speech.speak(message, {
    voice: "com.apple.ttsbundle.Amelie-compact",
    language: "fr-FR",
    pitch: 1.3,
  });
}

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
