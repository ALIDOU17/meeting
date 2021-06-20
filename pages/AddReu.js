import 'react-native-gesture-handler';

import db from '../database/firebaseDb';
import React, { Component } from 'react';
import { Button,StyleSheet,TextInput, Dimensions,ScrollView, ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default class FormReu extends Component {
    constructor() {
        super();
        this.dbRef = db.collection('reunion');
        this.state = {
          nom: '',
          participant: '',
          salle:'',
          motif:'',
          isLoading: false
        };
      }
      inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
    
      storeReunion() {
        if(!this.state.nom === ''){
         alert('Veuillez entrer le nom de la reunion!')
        } else {
          this.setState({
            isLoading: true,
          });      
          this.dbRef.add({
            heure: this.state.heure,
            participant: this.state.participant,
            salle: this.state.salle,
            motif: this.state.motif,
          }).then((res) => {
            this.setState({
              heure: '',
              participant: '',
              salle:'',
              motif:'',
              isLoading: false,
            });
            this.props.navigation.navigate("liste")
          })
          .catch((err) => {
            console.error("Error found: ", err);
            this.setState({
              isLoading: false,
            });
          });
        }
      }
    
 render (){
    if(this.state.isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        )
      }
      return (
        <View style={styles.container}>
        <ScrollView  contentContainerStyle={styles.container}>
          
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Salle de la réunion'}
                value={this.state.salle}
                onChangeText={(val) => this.inputValueUpdate(val, 'salle')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Heure de la réunion'}
                value={this.state.heure}
                onChangeText={(val) => this.inputValueUpdate(val, 'heure')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Motif de la reunion'}
                value={this.state.motif}
                onChangeText={(val) => this.inputValueUpdate(val, 'motif')}
            />
          </View>
          <View style={styles.inputGroup}>
          <TextInput
               // multiline={true}
                //numberOfLines={4}
                placeholder={'Email-participant'}
                value={this.state.participant}
                onChangeText={(val) => this.inputValueUpdate(val, 'participant')}
            />
          </View>
          <View style={styles.button}>
            <Button
              title='Ajouter'
              onPress={() => this.storeReunion()} 
              color="#3d84f5"
            />
          </View>
        </ScrollView>
        </View>
      );
   
 }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    
  },
  inputGroup: {
    padding: 0,
    marginBottom: 15,
    backgroundColor: "#D3D3D3",
    width: 440,
    height: 25,
    borderColor: "#D3D3D3",
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
    
  }
})
