import React, { useState } from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from './Styles';
//import notes from './Notes';

const NotesScreen = () => {
  
  const [notes, setNotes] = useState([
    { text: "Note a", id: 1 },
    { text: "Note b", id: 2 },
    { text: "Note c", id: 3 },
    { text: "Note d", id: 4 },
  ]);

  const [text, setText] = useState('');

  const handleChangeText = event => {
    if(notes.map(note => note.text).includes(text)){
      //simple alert -> alert('Note already exists!')
      //alert with buttons
      Alert.alert(
        "Note that you are trying to add already exists!",
        "Would you like to add it anyway?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel pressed"),
            style: "alert_cancel" //not implemented
          },
          {
            text: "Add dublicate", onPress: () => {
              setNotes([...notes, {text: text, id: generateID()}])
              setText('')
            },
            style: "alert_ok" //not implemented
          }
        ]
      )
    } else {
      setNotes([...notes, {text: text, id: generateID()}])
      setText('')
    }
  }
  
  const generateID = () =>{
    const max = Math.max.apply(null, notes.map(item => item.id))
    return max+1;
  }

  return ( 
    <View style={styles.view}>
      <View style={styles.header}>
        <Text>MY NOTES</Text>
      </View>
      <ScrollView style={styles.notes}>
        <Text>{notes.map(note => `${note.text} ${note.id} \n`)}</Text>
      </ScrollView>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Type here to add a note.."
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />
        <View style={styles.buttonArea}>
          <Button style={styles.buttonStyle} title="add note" onPress={() => handleChangeText()} />
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen name="Notes" component={NotesScreen}/>  
      </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;