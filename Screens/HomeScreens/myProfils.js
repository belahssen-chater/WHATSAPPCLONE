import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import firebase from "../../Config";
import { Link } from "@react-navigation/native";
const database = firebase.database();

export default function MyProfils(props) {
  const userid = props.route.params.userid;
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Pseudo, setPseudo] = useState("");

  const [UrlImage, setUrlImage] = useState();

  const chargerImageintoStoren = async (localurl) => {
    const blob = await imageToBlob(localurl);
    const storage = firebase.storage();
    const ref_touslesimages = storage.ref("touslesimages");
    const ref_uneimage = ref_touslesimages.child("userid");

    await ref_uneimage.put(blob);
    const url = await ref_uneimage.getDownloadURL();
    return url;
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setUrlImage(result.assets[0].uri);
    }
  };
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };

  return (
    <ImageBackground
      source={require("../../assets/profil.jpg")}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Text style={styles.textstyle}>My profil</Text>
      <TouchableOpacity onPress={() => {pickImage()}}>
        <Image
          source={
            UrlImage ? { uri: UrlImage } : require("../../assets/icon.png")
          }
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
          }}
        ></Image>
      </TouchableOpacity>

      <TextInput
        onChangeText={(text) => {
          setNom(text);
        }}
        textAlign="center"
        placeholderTextColor="#0005"
        placeholder="Nom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPrenom(text);
        }}
        textAlign="center"
        placeholderTextColor="#0005"
        placeholder="Prenom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setTelephone(text);
        }}
        placeholderTextColor="#0005"
        textAlign="center"
        placeholder="Telephone"
        keyboardType="phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPseudo(text);
        }}
        placeholderTextColor="#0005"
        textAlign="center"
        placeholder="Pseudo"
        style={styles.textinputstyle}
      ></TextInput>

      <TouchableOpacity
        onPress={async () => {
          if (UrlImage && Nom.length > 0) {
            const linkimage = await chargerImageintoStoren(UrlImage);

            const ref_profils = database.ref("profils");
          
            const ref_un_profils = ref_profils.child(userid);
            ref_un_profils.set({
              Nom,
              Prenom,
              Pseudo,
              Telephone,
              Link: linkimage,
              Userid: userid,
            });
          }
        }}
        disabled={false}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={{
          marginBottom: 10,
          backgroundColor: "#4682a0",
          textstyle: "italic",
          fontSize: 24,
          height: 40,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textinputstyle: {
    fontStyle: "italic",
    backgroundColor: "#0002",
    fontSize: 13,
    width: "70%",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  textstyle: {
    fontSize: 32,
    fontFamily: "serif",
    color: "#4682b4",
    fontWeight: "bold",
  },
  container: {
    paddingTop: 40,
    color: "blue",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
