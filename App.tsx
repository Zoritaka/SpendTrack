import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import { ShoppingListDetailsScreen } from './screens/ShoppingListDetailsScreen';
import { ExpenseAnalysisScreen } from './screens/ExpenseAnalysisScreen'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Список покупок" component={HomeScreen} />
      <Stack.Screen name="ShoppingListDetails" component={ShoppingListDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Список покупок" 
          component={HomeStack} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Анализ расходов" 
          component={ExpenseAnalysisScreen} 
          options={{ headerShown: true }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
