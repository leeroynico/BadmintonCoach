import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function ModalEdit(props) {
  const [modalVisible, setModalVisible] = useState(props.active);
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
          <View style={styles.modalView}>
            <Text>Hello je suis la modale!</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "single", value: "single" },
                { label: "pyramide", value: "pyramide" },
                { label: "séries", value: "séries" },
              ]}
            />
          </View>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
});
