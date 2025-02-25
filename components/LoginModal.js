import { getApp } from "firebase/app";
import React, { useState } from "react";
import { Modal, TextInput, View, Text, TouchableOpacity } from "react-native";

const LoginModal = ({ visible, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Call the onSubmit function passed as prop to send data
    onSubmit({ email, password });
    // Clear the form after submission
    setEmail("");
    setPassword("");
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>Login</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    backgroundColor: "#FFF0BD",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  textInput: {
    width: "80%",
    backgroundColor: "#FFF",
    width: "90%",
    padding: 20,
    borderRadius: 5,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#E50046",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 25,
  },
};
export default LoginModal;
