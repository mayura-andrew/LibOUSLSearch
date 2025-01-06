// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from '../src/navigation/TabNavigator';
import { LoginScreen } from '../src/screens/LoginScreen';
import { ProfileScreen } from '../src/screens/ProfileScreen';
import { RootStackParamList } from './navigation';
import { BookSearchScreen } from '../src/screens/BookSearchScreen';
import { AskLibrarianScreen } from '../src/screens/AskLibrarianScreen';
import { RepositoryScreen } from '../src/screens/RepositoryScreen';
import { PastPapersScreen } from '../src/screens/PastPapersScreen';
import { SearchResults } from '../src/components/SearchResults';



const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="TabNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Books" component={BookSearchScreen} />
      <Stack.Screen name="Repository" component={RepositoryScreen} />
      <Stack.Screen name="PastPapers" component={PastPapersScreen} />
      <Stack.Screen name="AskLibrarian" component={AskLibrarianScreen} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  );
};