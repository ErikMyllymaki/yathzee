import React, { useState, useEffect } from 'react';
import Styles from '../style/Styles';
import { View, Text, Pressable, Button } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS
} from '../constants/constants';

const STORAGE_KEY = '@score_Key';
let board = [];
export default function Gameboard({ route  }) {

  // const [turn, setTurn] = useState(false);
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [sumsOfNumbers, setSumsOfNumbers] = useState([0, 0, 0, 0, 0, 0]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));
  const [selectedNumbers, setSelectedNumbers] =
    useState(new Array(MAX_SPOT).fill(false));
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [bonusPointsAdded, setBonusPointsAdded] = useState(false);
  const allNumbersSelected = selectedNumbers.every((value) => value === true);
  const [scores, setScores] = useState([]);

  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem(STORAGE_KEY,jsonValue);
  //   }catch (e) {
    //     console.log(e)
    //   }
    // }
    const storeData = async (newScore) => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const scores = jsonValue != null ? JSON.parse(jsonValue) : [];
        const newKey = scores.length + 1;
        const newScoreWithKey = { key: newKey.toString(), ...newScore };
        const newScores = [...scores, newScoreWithKey];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
        console.log(newScores)
      }catch (e) {
        console.log(e)
      }
    }
  
  useEffect(() => {
    checkBonusPoints();
    if (allNumbersSelected) {
      const newScore = { name: name, score: totalPoints };
      storeData(newScore);
      // const newScores = [...scores, newScore];
      // setTodos(newTodos);
      // console.log(newScores);
      // console.log(scores)
      // updateScores(newScores);
    }
  }, [allNumbersSelected]);
  
  useEffect(() => {
    if (name === '' && route.params?.player) {
      setName(route.params.player);
    }
  }, [])


  const throwDices = () => {
    if (!allNumbersSelected) {
      if (nbrOfThrowsLeft != 0) {
        for (let i = 0; i < NBR_OF_DICES; i++) {
          if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = randomNumber;
          }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      } else {
        setStatus('Select your points before next throw!');
      }
    }
  }

  function selectDice(i) {
    if (nbrOfThrowsLeft != NBR_OF_THROWS) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : board[i];
      setSelectedDices(dices);
    } else {
      setStatus("You have to throw dices first.");
    }
  }

  function selectNumber(i) {
    let numbers = [...selectedNumbers];
    if (nbrOfThrowsLeft === 0) {
      if (!selectedNumbers[i - 1]) {
        numbers[i - 1] = true;
        setSelectedNumbers(numbers);
        setSelectedNumber(i);
        const updatedSumsOfNumbers = [...sumsOfNumbers];
        updatedSumsOfNumbers[i - 1] = board.filter((val) => val === i).reduce((acc, val) => acc + val, 0);
        setSumsOfNumbers(updatedSumsOfNumbers);
        const addPoints = updatedSumsOfNumbers.reduce((acc, val) => acc + val, 0);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
          if (!bonusPointsAdded) {
            setTotalPoints(addPoints);
          } else {
            setTotalPoints(addPoints + BONUS_POINTS);
          }
      } else {
        setStatus("You already selected points for " + i);
      }
    } else {
      setStatus('Throw 3 times before setting points');
    }
  }

  function checkBonusPoints() {
    if (nbrOfThrowsLeft < 3) {
      setStatus('Select and throw dices again.');
    }
    if (totalPoints >= BONUS_POINTS_LIMIT && !bonusPointsAdded) {
      setTotalPoints(totalPoints + BONUS_POINTS);
      setBonusPointsAdded(true);
    }
    if (nbrOfThrowsLeft === NBR_OF_THROWS && !allNumbersSelected) {
      setStatus('Throw dices.');
      // setTurn(false)
    } else if (allNumbersSelected){
      setStatus('Game over. All Points selected.');
      setNbrOfThrowsLeft(0);
      // setTurn(true)
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
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
            name={'dice-' + board[i]}
            size={50}
            color={selectedDices[i] ? "black" : "tomato"}
          />
        </Pressable>
      );
    }


  }

  const numRow = [];
  for (let i = MIN_SPOT; i < MAX_SPOT+1; i++) {
    numRow.push(
      <View key={'numrow' + i} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
        <Pressable
          key={'numrow' + i}
          onPress={() => selectNumber(i)}
        >
          <Text style={{
            textAlign: 'center'
          }}
            key={'numrow' + i}
          >{sumsOfNumbers[i - 1]}</Text>
          <Icon
            name={'numeric-' + [i] + '-circle'}
            size={32}
            color={selectedNumbers[i - 1] ? "black" : "tomato"}
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
        onPress={() => throwDices()}
      >
        <Text style={Styles.buttonText}>Throw dices</Text>
      </Pressable>
      <Text style={{ fontSize: 30, marginTop: 25 }}>Total: {totalPoints}</Text>
      <View>
        {bonusPointsAdded ? (
          <Text>Congrats! Bonus points {'(' + BONUS_POINTS + ')'} added</Text>
        ) : (
          <Text>You are {BONUS_POINTS_LIMIT - totalPoints} points away from bonus</Text>
        )}
      </View>
      <Text>{numRow}</Text>
      <Text style={Styles.info}>
        Player: {name}
      </Text>
      {/* <View>{!turn ? <Text>Vuoro ei käynnis</Text> : <Text>Vuoro käynnis</Text>}</View> */}
    </View>
  )
}
