import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import firebase from "../Config";
const database = firebase.database();
const ref_messagerie = database.ref("Messagerie");

export default function Discussion(props) {
  const userid = props.route.params.userid;
  const selectedid = props.route.params.selectedid;

  const iddisc =
    userid > selectedid ? userid + selectedid : selectedid + userid;

  const ref_disc = ref_messagerie.child(iddisc);

  const [msg, setmsg] = useState();
  const [data, setdata] = useState();
  // recuperer liste de message
  useEffect(() => {
    ref_disc.on("value", (datasnapshot) => {
      let d = [];
      datasnapshot.forEach((un_msg) => {
        d.push(un_msg.val());
      });
      setdata(d);
    });
    return () => {
      ref_disc.off();
    };
  });
  return (
    <ImageBackground
      source={require("../assets/profil.jpg")}
      style={styles.container}
    >
      <View style={{ flexDirection: "row" }}>
        <TextInput
          onChangeText={(ch) => {
            setmsg(ch);
          }}
          style={{
            height: 50,
            width: "85%",
            backgroundColor: "#0004",
            margin: 5,
          }}
        ></TextInput>
        <TouchableHighlight
          onPress={() => {
            const key = ref_disc.push().key;
            const ref_un_msg = ref_disc.child(key);
            ref_un_msg.set({
              Message: msg,
              Time: new Date().toLocaleString(),
              Sender: userid,
              Receiver: selectedid,
            });
          }}
          style={{ alignItems: "stretch", justifyContent: "space-around" }}
        >
          <Image
            source={require("../assets/send.png")}
            style={{ height: 40, width: 40, alignSelf: "center" }}
          ></Image>
        </TouchableHighlight>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return;
          <View
            style={{
              margin: 5,
              alignItems: item.Sender === userid ? "flex-end" : "flex-start",
            }}
          >
            <View
              style={
                item.Sender === userid
                  ? {
                      backgroundColor: "#00a5",
                      margin: 5,
                      width: "70%",
                      borderRadius: 5,
                      padding: 10,
                      alignItems: "flex-end",
                    }
                  : {
                      backgroundColor: "#aaa5",
                      margin: 5,
                      width: "70%",
                      padding: 10,
                      borderRadius: 5,
                      alignItems: "flex-start",
                    }
              }
            >
              <Text>{item.Message}</Text>
              <Text>{item.Time}</Text>
            </View>
          </View>;
        }}
        style={{ margin: 5 }}
      ></FlatList>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
});
