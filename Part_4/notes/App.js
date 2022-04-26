import React, { useState } from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView } from 'react-native';
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
    setNotes([...notes, {text: text, id: generateID()}])
  }
  
  const generateID = () =>{
    const max = Math.max.apply(null, notes.map(item => item.id))
    return max+1;
  }

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text>My notes</Text>
      </View>
      <View style={styles.notes}>
        <Text>{notes.map(note => `${note.text} ${note.id} \n`)}</Text>
      </View>
      <View>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <View style={styles.button}>
        <Button title="add note" onPress={() => handleChangeText()} />
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