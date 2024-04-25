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

const Register = ({ navigation }) => {
  const loginImage =
    "https://img.freepik.com/free-vector/security-concept-illustration_114360-497.jpg?w=740&t=st=1712937004~exp=1712937604~hmac=00bb3c4bdd8bb27353c292243185bf82ce3b5abe7dfa56a20a57b629c2075d8b";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  //login function
  const handleRegister = () => {
    if (!email || !password || !name || !city || !address || !contact) {
      return alert("Please fill all fields");
    }
    alert("Successfully Registered");
    navigation.navigate("login");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: loginImage }} style={styles.image} />
      <InputBox
        placeholder={"Enter Your Fullname"}
        value={name}
        setValue={setName}
        autoComplete={"name"}
      />
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
      <InputBox
        placeholder={"Enter Your contact"}
        value={contact}
        setValue={setContact}
        autoComplete={"tel"}
      />
      <InputBox
        placeholder={"Enter Your address"}
        value={address}
        setValue={setAddress}
        autoComplete={"address-line1"}
      />
      <InputBox
        placeholder={"Enter Your city"}
        value={city}
        setValue={setCity}
        autoComplete={"country"}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
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
    marginVertical: 10,
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

export default Register;
