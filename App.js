import { StyleSheet, Text, View } from 'react-native';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import Header from './components/Header';
import Home from './components/Home';
import Styles from './style/Styles'

export default function App() {
  return (
    <View style={Styles.app}>
      <Header />
      <Home />
      <Footer />
    </View>
  );
}

