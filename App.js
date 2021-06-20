import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import FormReu from './pages/AddReu';
import DetailReu from './pages/DetailReu';
import ListReu from './pages/ListReu';
import { Icon } from "react-native-elements";
// ouvre la console
//import EditReu from './screens/EditReu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Stack = createStackNavigator();
export default function App ()   {
    
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="liste"
          component={ListReu}
          options={{
            headerStyle: {
              backgroundColor: "#3d84f5",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: (props) => (
              <Icon
                name="filter-list"
                type="material"
                color="white"
                style={{ width: 45 }}
              />
            ),
          }}
        />
        <Stack.Screen 
        name="AddReu" 
        component={FormReu}
        options={{ title: 'Ajouter une Réunion' }} />

        <Stack.Screen 
       name="ReunionDetail" 
       component={DetailReu} 
       options={{ title: 'Reunion Detail' }}
      />
      </Stack.Navigator>
      
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
