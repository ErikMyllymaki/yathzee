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
        <Tab.Screen name='Home' component={Home}/>
        <Tab.Screen name='Gameboard' component={Gameboard}/>
        <Tab.Screen name='Scoreboard' component={Scoreboard}/>
      </Tab.Navigator>
      <Footer />
    </NavigationContainer>
    // <View style={Styles.app}>
    //   <Home />
    //   {/* <Gameboard /> */}
    // </View>
  );
}
