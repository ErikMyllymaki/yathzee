import React, { useState, useEffect } from 'react';
import Styles from '../style/Styles';
import { View, Text, Pressable } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS
} from '../constants/constants';

let board = [];
export default function Gameboard({ route }) {

  const [game, setGame] = useState(false);
  const [turn, setTurn] = useState(false);
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [sumsOfNumbers, setSumsOfNumbers] = useState([0, 0, 0, 0, 0, 0]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));
  const [selectedNumbers, setSelectedNumbers] =
    useState(new Array(6).fill(false));

  useEffect(() => {
    if (name === '' && route.params?.player) {
      setName(route.params.player);
    }
  }, [])

  useEffect(() => {
    checkBonusPoints();
    // || nbrOfThrowsLeft === 0
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Throw dices.');
      setTurn(false)
    } else {
      setTurn(true)
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
    }
  }, [nbrOfThrowsLeft]);


  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = randomNumber;
      }
    }
    // if (nbrOfThrowsLeft > 0) {
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    setSelectedNumbers(new Array(6).fill(false));
    // }
  }

  // function getDiceColor(i) {
  //   if (board.every((val, i, arr) => val === arr[0])) {
  //     return "lightgreen";
  //   }
  //   else {
  //     return selectedDices[i] ? "black" : "tomato";
  //   }
  // }

  // function getNumberColor(i) {
  //   if (sumsOfNumbers.every((val, i, arr) => val === arr[0])) {
  //     return selectedNumbers[i] ? "black" : "tomato";
  //   }
  //   // else {
  //   //   return selectedNumbers[i] ? "black" : "tomato";
  //   // }
  // }

  function selectDice(i) {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : board[i];
    setSelectedDices(dices);
  }
  function selectNumber(i) {
    if (selectedDices.includes(i+1)) {
      let numbers = [...selectedNumbers];
      numbers[i] = selectedNumbers[i] ? false : true;
      setSelectedNumbers(numbers);
      let sum = 0;
      for (let j = 0; j < selectedDices.length; j++) {
        if (selectedDices[j] === board[j]) {
          sum += board[j]
        }
      }
      const updatedSumsOfNumbers = [...sumsOfNumbers];
      updatedSumsOfNumbers[i] = sum;
      setSumsOfNumbers(updatedSumsOfNumbers);
    }

  }

  function checkBonusPoints() {
    if (totalPoints > 62) {
      setTotalPoints(totalPoints + 50)
    }
    if (nbrOfThrowsLeft === 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS);
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    } else if (nbrOfThrowsLeft < 3) {
      setStatus('Select and throw dices again.');
    }
  }

  const diceRow = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    if (board[i]) {
      diceRow.push(
        <Pressable
          onPress={() => selectDice(i)}
          key={"dicerow" + i}
        >
          <Icon
            key={'dicerow' + i}
            name={'dice-' + board[i]}
            size={50}
            color={selectedDices[i] ? "black" : "tomato"}
          />
        </Pressable>
      );
    }


  }

  const numRow = [];
  for (let i = 0; i < 6; i++) {
    numRow.push(
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          key={'numrow' + i}
          onPress={() => selectNumber(i)}
        >
          <Text style={{
            // backgroundColor:selectedNumbers[i] ? "black" : "tomato",     
            textAlign: 'center'
          }}
            key={'numrow' + i}
          >{sumsOfNumbers[i]}</Text>
          <Icon
            name={'numeric-' + [i + 1] + '-circle'}
            size={32}
            color={selectedNumbers[i] ? "black" : "tomato"}
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
        onPress={() => throwDices()}
      >
        <Text style={Styles.buttonText}>Throw dices</Text>
      </Pressable>
      <Text style={{ fontSize: 30, marginTop: 25 }}>Total: {totalPoints}</Text>
      <View>
        {totalPoints > 62 ? (
          <Text>Congrats! Bonus points added</Text>
        ) : (
          <Text>You are {62 - totalPoints} points away from bonus</Text>
        )}
      </View>
      <Text>{numRow}</Text>
      <View>{!turn ? <Text>Vuoro ei käynnis</Text> : <Text>Vuoro käynnis</Text>}</View>
      <Text>{`Current State: [${selectedDices.join(', ')}]`}</Text>
      <Text>{`Current State: [${board.join(', ')}]`}</Text>
    </View>
  )
}
