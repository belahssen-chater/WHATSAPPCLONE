import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  RefreshControlBase,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Dialog } from "react-native-paper";

import firebase from "../../Config";
const database = firebase.database();
const ref_profils = database.ref("profils");

export default function ListProfils(props) {
  const userid = props.route.params.userid;
  const [isDialogVisible, SetisDialogVisbile] = useState(false);
  const [itemSelected, setitemSelected] = useState();
  const [data, setdata] = useState([]);
  useEffect(() => {
    // chargement data from reference profils
    ref_profils.on("value", (datasnapshot) => {
      let d = [];
      datasnapshot.forEach((un_profil) => {
        if(un_profil.Userid !== userid)
        d.push(un_profil.val());
      });
      setdata(d);
    });
    return () => {
      ref_profils.off();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/profil.jpg")}
      style={styles.container}
    >
      <Text style={styles.titre}> ListProfils</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                textAlignItels: "center",
                height: 60,
                backgroundColor: "#fff",
                elevation: 10,
                margin: 7,
                borderRadius: 6,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setitemSelected(item);
                  SetisDialogVisbile(true);
                }}
              ></TouchableOpacity>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  marginRight: 25,
                  borderRadius: 25,
                  margin: 5,
                }}
                source={require("../../assets/favicon.png")}
              ></Image>
              <Text>
                {itemSelected.Nom +
                  "" +
                  itemSelected.Prenom +
                  " " +
                  itemSelected.Telephone}
              </Text>
              <Text>{item.prenom}</Text>
            </View>
          );
        }}
        style={styles.list}
      ></FlatList>
      <Dialog visible={isDialogVisible}>
        <Dialog.Title> Options</Dialog.Title>
        <Dialog.Content>
          <Image
            style={{ height: 100, width: 100, marginRight: 25 }}
            source={require("../../assets/favicon.png")}
          ></Image>
          <Text>les info dispo</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              if (Platform.OS === "android")
                Linking.openURL("tel:" + itemSelected.telephone);
              if (Platform.OS === "ios") {
                Linking.openURL("telprompt:" + itemSelected.telephone);
              }
            }}
          >
            Appeler
          </Button>
          <Button
            onPress={() => {
              props.navigation.navigate("discussion"),
                { userid, selectedid: itemSelected.userid };
            }}
          >
            Discuter
          </Button>
          <Button
            onPress={() => {
              SetisDialogVisbile(false);
            }}
          >
            fermer
          </Button>
        </Dialog.Actions>
      </Dialog>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  list: {
    margin: 5,
  },
  container: {
    flex: 1,
  },
  titre: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginTop: 20,
  },
});
