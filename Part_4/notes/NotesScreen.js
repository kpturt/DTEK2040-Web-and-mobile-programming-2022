import React, { useEffect, useState } from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';
import AddNoteScreen from './AddNoteScreen';

const NotesScreen = ({ route, navigation }) => {
  
  // trying to receive notes from AddNoteScreen, gives an error
  //const {notes} = route.params;

  //test object just that the home page doesnt't crash
  const notes = [{text: "asd", id: 1}]
  console.log("notes NotesScreen: ", notes)

  // tried to change the passing type of notes
  //const prsNotes = JSON.parse(notes);
  //console.log("notes parsed NotesScreen: ", prsNotes)

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text>MY NOTES</Text>
      </View>
      <ScrollView style={styles.notes}>
        <Text>{notes.map(note => `${note.text} ${note.id} \n`)}</Text>
        <Button 
          style={styles.buttonStyle} 
          title="note screen" 
          onPress={() => {
            navigation.navigate('AddNote');
          }}
        />
      </ScrollView> 
    </View>
  );
}

export default NotesScreen