import React, { useState } from "react";
import { View, Button } from "react-native";
import LoginModal from "./components/LoginModal";

const App = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
    setLoginModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        <UserDashboard user={user} />
      ) : (
        <Button title="Login" onPress={() => setLoginModalVisible(true)} />
      )}
      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </View>
  );
};

export default App;
