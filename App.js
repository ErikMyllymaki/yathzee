import { StyleSheet, Text, View } from 'react-native';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import Header from './components/Header';
import Home from './components/Home';
import Styles from './style/Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scoreboard from './components/Scoreboard';


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{tabBarStyle: {display: 'none'}}}/>
        <Tab.Screen name='Gameboard' component={Gameboard} options={{tabBarStyle: {backgroundColor: 'tomato'}}}/>
        <Tab.Screen name='Scoreboard' component={Scoreboard} options={{tabBarStyle: {backgroundColor: 'tomato'}}} />
      </Tab.Navigator>
      <Footer />
    </NavigationContainer>
  );
}
