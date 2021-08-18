import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Pressable, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Slider, Button, Icon, Text } from "react-native-elements";

export default function ModalEdit(props) {
  const [modalVisible, setModalVisible] = useState(props.active);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    props.active === true ? setModalVisible(!modalVisible) : "";
  }, [props.active]);

  return (
    <>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalView}>
              <Text h4> Réglages</Text>
              <Text style={styles.texte}> temps du shadow</Text>
              <Text style={styles.texte}> {props.seconds}</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => props.setSeconds(value)}
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
              />
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => props.setDelai(value)}
                items={[
                  { label: "tranquille", value: 5000 },
                  { label: "chaud", value: 3000 },
                  { label: "warrior", value: 2000 },
                ]}
                placeholder={{
                  label: "difficulté",
                  value: "",
                }}
              />
              <View style={styles.containerButton}>
                <Button
                  icon={
                    <Icon
                      type="ionicon"
                      name="close-outline"
                      size={20}
                      color="white"
                    />
                  }
                  buttonStyle={{
                    backgroundColor: "#db3a34",
                  }}
                  onPress={() => setModalVisible(!modalVisible)}
                />
                <Button
                  icon={
                    <Icon
                      type="ionicon"
                      name="checkmark-done-outline"
                      size={20}
                      color="white"
                    />
                  }
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  texte: {
    marginTop: -10,
  },
});
