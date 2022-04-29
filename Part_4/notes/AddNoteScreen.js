import React, { useEffect, useState } from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';

const AddNoteScreen = ({ navigation, route }) => {
  
  const [text, setText] = useState('');
  
  //This is the array of object I was trying to pass
  const [notes, setNotes] = useState([ // state where we store our notes, passes as undefined?
    { text: "Note a", id: 1 },
    { text: "Note b", id: 2 },
    { text: "Note c", id: 3 },
    { text: "Note d", id: 4 },
  ]);
  
  console.log("notes AddNoteScreen: ", notes)

  // tried to change the passing type of notes
  //const strNotes = JSON.stringify(notes);
  //console.log("Notes stringified AddNoteScreen: ", strNotes)
  
  // for generating a new id for a note
  const generateID = () => {
    const max = Math.max.apply(null, notes.map(item => item.id))
    return max+1;
  }

  // this handles user typing and note saving
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

  return(
    <View>
      <View>
        <View>
          {notes}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Type here to add a note.."
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />
        <View style={styles.buttonArea}>
          <Button 
            style={styles.buttonStyle} 
            title="add note" 
            onPress={() => 
              handleChangeText()
            } 
          />
        </View>
        <View style={styles.buttonArea}>
          <Button 
            style={styles.buttonStyle} 
            title="go home" 
            onPress={() => {
              navigation.navigate('Notes', notes)
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default AddNoteScreen