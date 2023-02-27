import React, { useState } from 'react';
import { View,Text } from 'react-native';
import Gameboard from './Gameboard';
import Styles from '../style/Styles';

// const STORAGE_KEY = '@score_Key';

export default function Scoreboard({ newScores }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setScores(newScores);
  }, [newScores]);
  console.log(scores)

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






