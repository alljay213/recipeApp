import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

import {
  Modal,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

const RegisterModal = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        email,
      });
      Alert.alert("Success", "User registered successfully");
      console.log("User registered:", user.uid);
      setName("");
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("Registration Error:", error.message);
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
          <Text style={styles.text}>Register Account</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
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
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            title="Close"
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    backgroundColor: "#FDAB9E",
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

export default RegisterModal;
