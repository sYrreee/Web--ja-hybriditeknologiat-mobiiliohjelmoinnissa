import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
// Huom: varmista että tiedostonimet täsmäävät kansiorakenteeseesi
import CustomAppBar from './components/CustomAppBar'; 
import HomeScreen from './screens/HomeScreen';
import SecondScreen from './screens/SecondScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            
            header: (props) => <CustomAppBar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MD Nav Demo' }} />
          <Stack.Screen name="Second" component={SecondScreen} options={{ title: 'MD Nav Demo' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

