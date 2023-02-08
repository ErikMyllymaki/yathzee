import React, { useState, useEffect } from 'react';
import Styles from '../style/Styles';
import { View, Text, Pressable } from 'react-native';
import {
        NBR_OF_DICES,
        NBR_OF_THROWS,
        MIN_SPOT,
        MAX_SPOT,
        BONUS_POINTS_LIMIT,
        BONUS_POINTS} from '../constants/constants';


export default function Gameboard() {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(0);
  const [status, setStatus] = useState('eqweq');
  return (
      <View style={Styles.container}>
        <Text style={Styles.info}>
          Throws left: {nbrOfThrowsLeft}
        </Text>
        <Text style={Styles.info}>
          {status}
        </Text>
        <Pressable style={Styles.button}>
          <Text style={Styles.buttonText}>Throw dices</Text>
        </Pressable>
      </View>

  )
}
