import React, { useState } from 'react';
import { View,Text } from 'react-native';
import Gameboard from './Gameboard';
import Styles from '../style/Styles';

// const STORAGE_KEY = '@score_Key';

export default function Scoreboard() {
  const [scores, setScores] = useState([]);

  const getData = async() => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
        .then (req => JSON.parse(req))
        .then (json => {
          if (json === null) {
            json = []
          }
          setScores(json);
          console.log(scores)
        })
        .catch (error => console.log(error));
    } catch (e) {
      console.log(e)
    }
  }

  


  const sortedScores = scores.sort((a, b) => b.score - a.score);
  const topThreeScores = sortedScores.slice(0, 3);

  return (
    <View>
      <Text>Top three scores:</Text>
      {topThreeScores.map((score) => (
        <Text key={score.key}>{score.name}: {score.score}</Text>
      ))}
    </View>
  );
}






