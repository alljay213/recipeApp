import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CustomAlert from "./CustomAlert";
import { Modal, TextInput, View, Text, TouchableOpacity } from "react-native";

const LoginModal = ({ visible, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlertTitle("Error");
      setAlertMessage("Please fill in all fields");
      setAlertVisible(true);
      return;
    }
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setAlertTitle("Success");
      setAlertMessage("User logged in successfully");
      setAlertVisible(true);
      console.log("User logged in:", user.uid);

      // Clear the form after successful login
      setEmail("");
      setPassword("");

      // Call the onLoginSuccess function passed as prop to navigate to UserDashboard
      onLoginSuccess(user);
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage(error.message);
      setAlertVisible(true);
      // console.error("Login Error:", error.message);
    }
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
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </Modal>
  );
};

const styles = {
  container: {
    backgroundColor: "#C7DB9C",
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
