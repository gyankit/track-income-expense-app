import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from './src/pages/Auth';
import Home from './src/pages/Home';
import Form from './src/pages/Form';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: useColorScheme() === 'dark' ? 'black' : '#bbedea'
          },
          title: 'Track Income Expense',
          headerTintColor: useColorScheme() !== 'dark' ? 'black' : 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} s
      >
        <Stack.Screen
          name="Auth"
          component={Auth}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Form"
          component={Form}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
