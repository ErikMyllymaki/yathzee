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

export default function Gameboard( {route} ) {


  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [sumsOfNumbers, setSumsOfNumbers] = useState([0,0,0,0,0,0]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false));
  const [selectedNumbers, setSelectedNumbers] = 
    useState(new Array(6).fill(false));

  useEffect(() => {
    if (name === '' && route.params?.player ) {
      setName(route.params.player);
    }
  }, [])
  

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = 'dice-' + randomNumber;
    }
    if (nbrOfThrowsLeft > 0) {
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    }
  }

  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "lightgreen";
    }
    else {
      return selectedDices[i] ? "black" : "tomato";
    }
  }

  function getNumberColor(i) {
    if (sumsOfNumbers.every((val, i, arr) => val === arr[0])) {
      return selectedNumbers[i] ? "black" : "tomato";
    }
    // else {
    //   return selectedNumbers[i] ? "black" : "tomato";
    // }
  }

  function selectDice(i) {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function selectNumber(i) {
    let numbers = [...selectedNumbers];
    numbers[i] = selectedNumbers[i] ? false : true;
    setSelectedNumbers(numbers);
  }

  const CheckBonusPoints = () => {
    if (totalPoints > 62) {
      setTotalPoints(totalPoints + 50)
      return (
        <Text>Congrats! Bonus points (50) added</Text>
      )
    } else {
      return (
        <Text>You are points away from bonus</Text>
      )
    }

  }

  const diceRow = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    diceRow.push(
      <Pressable
        onPress={() => selectDice(i)}
        key={"dicerow" + i}
      >
        <Icon 
          key={'dicerow' + i}
          name={board[i]}
          size={50}
          color={getDiceColor(i)}
        />
      </Pressable>

    );
  }

  const numRow = [];
  for (let i = 0; i < 6; i++) {
    numRow.push(
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <Text>{sumsOfNumbers[i]}</Text>
        <Pressable 
          key={'numrow' + i}
          onPress={() => selectNumber(i)}
        >
          <Icon
              name={'numeric-' + [i+1] + '-circle'}
              size={32}
              color={getNumberColor(i)}
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
          Player: {name}
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
        <View>
          <CheckBonusPoints />
        </View>
        <Text>{numRow}</Text>
      </View>
  )
}
