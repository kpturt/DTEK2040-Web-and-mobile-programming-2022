import * as React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from './Styles';
//import notes from './Notes';

let notes = [
    {
      name: "Note a",
      id: 1
    },
    {
      name: "Note b",
      id: 2
    },
    {
      name: "Note c",
      id: 3
    },
    {
      name: "Note d",
      id: 4
    }
  ]

const NotesScreen = () => {
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text>My notes</Text>
      </View>
      <View style={styles.notes}>
        <Text>{notes.map(note => `N: ${note.name} ${note.id} \n`)}</Text>
      </View>
      <View style={styles.button}>
        <Button  title="add note" onPress={() => alert('No saving action implemented in this example')} />
      </View>
    </View>
  );
}

const AddNote = () => {
  return (
    <View>
      <Text>asd</Text>
      
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen name="Notes" component={NotesScreen}/>
        <Stack.Screen name="AddNoteButton" component={AddNote}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;