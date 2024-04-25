import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Form/InputBox";

const Login = ({ navigation }) => {
  const loginImage =
    "https://img.freepik.com/free-vector/security-concept-illustration_114360-497.jpg?w=740&t=st=1712937004~exp=1712937604~hmac=00bb3c4bdd8bb27353c292243185bf82ce3b5abe7dfa56a20a57b629c2075d8b";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //login function
  const handleLogin = () => {
    if (!email || !password) {
      return alert("Please enter email or password");
    }
    alert("login successfully");
    navigation.navigate("home");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: loginImage }} style={styles.image} />
      <InputBox
        placeholder={"Enter Your Email"}
        value={email}
        setValue={setEmail}
        autoComplete={"email"}
      />
      <InputBox
        placeholder={"Enter Your Password"}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        <Text>
          Not user yet please ?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("register")}
          >
            Register here
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    height: 230,
    width: "100%",
    resizeMode: "contain",
    borderRadius: 10,
    marginVertical: 20,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#000000",
    width: "80%",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    marginVertical: 20,
  },
  loginBtnText: {
    color: "#ffffff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 18,
  },
  link: {
    color: "red",
  },
});

export default Login;
