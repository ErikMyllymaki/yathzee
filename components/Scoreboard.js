import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from '../style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@score_Key';

export default function Scoreboard() {
  const [scores, setScores] = useState([]);


  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage successfully cleared');
      setScores([]);
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    }
  }

  const getData = async () => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
        .then(req => JSON.parse(req))
        .then(json => {
          if (json === null) {
            json = []
          }
          setScores(json)
        })
        .catch(error => console.log(error));
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const sortedScores = scores.sort((a, b) => b.score - a.score);
  const topThreeScores = sortedScores.slice(0, 3);

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Top three scores:</Text>
      {topThreeScores.map((score) => (
        <View key={score.key} style={Styles.score}>
          <Text style={Styles.scoreText} key={score.key}>Player: {score.name}, {score.score} points</Text>
        </View>
      ))}
      <TouchableOpacity
        style={Styles.button}
        onPress={() => getData()}
      >
        <Text style={Styles.buttonText}>
          Update scoreboard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.button}
        onPress={() => clearAsyncStorage()}
      >
        <Text style={Styles.buttonText}>
          Clear scoreboard data
        </Text>
      </TouchableOpacity>
    </View>
  );
}






