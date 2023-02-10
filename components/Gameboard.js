import React, { useState, useEffect } from 'react';
import Styles from '../style/Styles';
import { View, Text, Pressable } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {NBR_OF_DICES,
        NBR_OF_THROWS,
        MIN_SPOT,
        MAX_SPOT,
        BONUS_POINTS_LIMIT,
        BONUS_POINTS} from '../constants/constants';

let board = [];

export default function Gameboard() {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [sum, setSum] = useState(0);
  const [sumsOfNumbers, setSumsOfNumbers] = useState([0,0,0,0,0,0]);
  const [totalPoints, setTotalPoints] = useState(0);


  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = 'dice-' + randomNumber;
    }
    if (nbrOfThrowsLeft > 0) {
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    }
  }

  // const checkBonusPoints = () => {

  // }

  const diceRow = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    diceRow.push(
      <Icon 
        name={board[i]}
        key={"dicerow" + i}
        size={50}
        color='tomato'
      />
    );
  }

  const numRow = [];
  for (let i = 1; i < 7; i++) {
    numRow.push(
      <View  style={{justifyContent:'center', alignItems:'center'}}>
      <Text>{sumsOfNumbers[i - 1]}</Text>
        <Pressable>
          <Icon 
              name={'numeric-' + [i] + '-circle'}
              key={"numrow" + i}
              size={32}
              color='tomato'
          />
        </Pressable>

      </View>

    )
  }



  return (
      <View style={Styles.container}>
        <Text>{diceRow}</Text>
        <Text style={Styles.info}>
          Throws left: {nbrOfThrowsLeft}
        </Text>
        <Text style={Styles.info}>
          {status}
        </Text>
        <Pressable 
          style={Styles.button}
          onPress={throwDices}
          >
          <Text style={Styles.buttonText}>Throw dices</Text>
        </Pressable>
        <Text style={{fontSize:30, marginTop: 25}}>Total: {totalPoints}</Text>
        <Text>{numRow}</Text>
      </View>
  )
}
