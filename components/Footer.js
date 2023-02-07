import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../style/Styles';

export default function Footer() {
  return (
    <View style={Styles.footer}>
        <Text style={Styles.author}>Author: Erik Myllymäki</Text>
    </View>
  )
}
