import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";

export default class LigneReunion extends React.Component {
  constructor(props) {
    super(props);
  }
  getRandomcolor = () => {
    return "#"  + Math.floor(Math.random()*16777215).toString(16) ; 
  }
  render() {
    
    return (
      <TouchableWithoutFeedback>
        <View style={styles.row}>
          <Icon
            style={{ width: 80 }}
            name="lens"
            size={50}
            type="material"
            color={this.getRandomcolor()}
          />
          <View style={{ width: 250 }}>
            <Text style={styles.primaryText}>
            {this.props.motif} - {this.props.heure} -{" "}
              {this.props.salle}
            </Text>
            <Text style={styles.secondaryText}>{this.props.participant}</Text>
          </View>
          <View style={styles.icon}>
            <Icon name="delete" type="material" color="black" onPress={(reunion) => this.props.onDelete(reunion)}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    marginBottom: 4,
  },
  secondaryText: { color: "grey" },
  avatar: {
    alignItems: "flex-start",
  },
});