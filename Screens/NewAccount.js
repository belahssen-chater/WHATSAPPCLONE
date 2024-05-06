import { StatusBar } from "expo-status-bar";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import firebase from "../Config";
const auth = firebase.auth();

export default function NewAccount(props) {
  var email,
    pwd = "",
    confirmpwd = "";
  return (
    <ImageBackground
      source={require("../assets/imgback.jpg")}
      style={styles.container}
    >
      <View
        style={{
          padding: 4,
          backgroundColor: "40004",
          width: "95%",
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#ccc",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            color: "#fff",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          welcome!
        </Text>
        <TextInput
          onChangeText={(ch) => {
            email = ch;
          }}
          keyboardType="email-address"
          placeholder="email"
          style={styles.TextInput}
        ></TextInput>

        <TextInput
          onChangeText={(ch) => {
            pwd = ch;
          }}
          placeholder="password"
          secureTextEntry={true}
          style={styles.TextInput}
        >
          {" "}
        </TextInput>

        <TextInput
          onChangeText={(ch) => {
            confirmpwd = ch;
          }}
          placeholder="confirm password"
          secureTextEntry={true}
          style={styles.TextInput}
        >
          {" "}
        </TextInput>

        <View style={{ flexDirection: "row" }}>
          <Button
            title="Sign up "
            onPress={() => {
              if (pwd === confirmpwd && pwd.length > 5) {
                auth
                  .createUserWithEmailAndPassword(email, pwd)
                  .then(() => {
                    const userid = auth.currentUser.uid;
                    props.navigation.replace("home" + userid);
                  })
                  .catch((err) => {
                    alert(err);
                  });
              } else {
                alert("verify password");
              }
            }}
          ></Button>
          <Button
            onPress={() => {
              props.navigation.goBack();
            }}
            title="back"
          ></Button>
        </View>
      </View>
      <StatusBar style="dark" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#908",
    alignItems: "center", //allignement horizontale
    justifyContent: "center", //allignement verticale
  },
  TextInput: {
    width: "90%",
    height: 45,
    backgroundColor: "white",
    margin: 8,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});
