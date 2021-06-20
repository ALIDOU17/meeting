import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, View } from "react-native";
//import { ListItem } from "react-native-elements";
//import { StatusBar } from 'expo-status-bar';
import { FloatingAction } from "react-native-floating-action";
import db from "../database/firebaseDb";
import { FlatList } from "react-native-gesture-handler";
import LigneReunion from "./LigneReunion";

const actions = [
  {
    text: "Add",
    icon: require("../assets/add.png"),
    name: "btn_add",
    position: 1,
  },
];

export default class ListReu extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.firestoreRef = db.collection("reunion");
    this.state = {
      isLoading: true,
      userArr: [],
    };
  }
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { heure, motif, nom, participant, salle,key } = res.data();
      userArr.push({
        key: res.id,
        res,
        nom,
        heure,
        participant,
        salle,
        motif,
      });
      
    });
    this.setState({
      userArr,
      isLoading: false,
    });
  };

  handleDelete = (item) => {
    const dbRef = db.collection("reunion").doc(item.key);
    dbRef.delete().then((res) => {
    alert("La réunion a été bien supprimé");
    });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator color="#9E9E9E" />
        </View>
      );
    }

    return (
      
      <React.Fragment>
        <View style={styles.container}>
        <ScrollView >
          <FlatList
            data={this.state.userArr}
            style={styles.listStyle}
            renderItem={({ item }) => (
              <LigneReunion
                salle={item.salle}
                participant={item.participant}
                motif={item.motif}
                heure={item.heure}
                key={item.id}
                onDelete={() => this.handleDelete(item)}
              />
            )}
            keyExtractor={(item) => item.key}
          ></FlatList>
        </ScrollView>
        </View>
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            if (name == "btn_add") {
              this.navigation.navigate("AddReu");
            }
          }}
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
