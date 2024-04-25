import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { userData } from "../../data/userData";
import InputBox from "../../components/Form/InputBox";

const Profile = ({navigation}) => {
  //  state
  const [email, setEmail] = useState(userData.email);
  const [profilePic, setProfilePic] = useState(userData.profilePic);
  const [password, setPassword] = useState(userData.password);
  const [name, setName] = useState(userData.name);
  const [city, setCity] = useState(userData.city);
  const [address, setAddress] = useState(userData.address);
  const [contact, setContact] = useState(userData.contact);

  // update profile
  const handleUpdate = () => {
    if (!email || !password || !name || !city || !address || !contact) {
        return alert("Please fill all fields");
      }
      alert("Profile Updated Successfully");
      navigation.navigate("account");
  }
  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: profilePic }} />
            <Pressable onPress={() => alert("profile dialogue box")}>
              <Text style={{ color: "red" }}>update your profile pic</Text>
            </Pressable>
          </View>
          <InputBox
            value={name}
            setValue={setName}
            placeholder={"enter your name"}
            autoComplete={'name'}
          />
          <InputBox
            value={email}
            setValue={setEmail}
            placeholder={"enter your email"}
            autoComplete={'email'}
          />
          <InputBox
            value={password}
            setValue={setPassword}
            placeholder={"enter your password"}
            autoComplete={'password'}
            secureTextEntry={true}
          />
          <InputBox
            value={address}
            setValue={setAddress}
            placeholder={"enter your address"}
            autoComplete={'address-line1'}
          />
          <InputBox
            value={city}
            setValue={setCity}
            placeholder={"enter your city name"}
            autoComplete={'country'}
          />
          <InputBox
            value={contact}
            setValue={setContact}
            placeholder={"enter your contact"}
            autoComplete={'tel'}
          />
          <TouchableOpacity style = {styles.btnUpdate} onPress={handleUpdate}>
            <Text style = {styles.btnUpdateText}> UPDATE PROFILE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
  },
  btnUpdate : {
    backgroundColor: '#000000',
    height: 40,
    borderRadius: 20,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10,
  },
  btnUpdateText : {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  }
});
export default Profile;
