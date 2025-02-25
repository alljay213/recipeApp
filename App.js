import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";

export default function App() {
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const handleRegisterSubmit = (userData) => {
    console.log("User Registered:", userData);
    setIsRegisterModalVisible(false); // Close the modal after submission
  };

  const handleLoginSubmit = (loginData) => {
    console.log("User Logged In:", loginData);
    setIsLoginModalVisible(false); // Close the modal after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recipe App</Text>
      <StatusBar hidden />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => setIsRegisterModalVisible(true)}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <RegisterModal
        visible={isRegisterModalVisible}
        onClose={() => setIsRegisterModalVisible(false)} // Close on button press
        onSubmit={handleRegisterSubmit} // Handle registration submission
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => setIsLoginModalVisible(true)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <LoginModal
        visible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)} // Close on button press
        onSubmit={handleLoginSubmit} // Handle login submission
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF0BD",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#E50046",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
    //borderColor: "#E50046",
    //borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
  },
});
