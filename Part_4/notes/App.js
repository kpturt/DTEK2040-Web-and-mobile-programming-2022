import React, { useEffect, useState } from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';
import NotesScreen from './NotesScreen';
import AddNoteScreen from './AddNoteScreen';


const Stack = createStackNavigator();
const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Notes">
          <Stack.Screen name="Notes" component={NotesScreen}/>
          <Stack.Screen name="AddNote" component={AddNoteScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;