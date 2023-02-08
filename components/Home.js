import React, { useState } from 'react';
import Styles from '../style/Styles';
import { View, Text, Pressable, TextInput } from 'react-native';
import Gameboard from './Gameboard';
import Icon from '@expo/vector-icons/AntDesign'


export default function Home() {

    const [name, setName] = useState('');
    const [checkName, setCheckName] = useState(false);
    const [showRules, setShowRules] = useState(true);

    const Game = () => {
        if (showRules) {
            return (
                <View style={Styles.container}>
                    <Icon
                        name='questioncircle'
                        size={60}
                        color='tomato'
                        style={{ marginBottom: 10 }}
                    />
                    <Text style={Styles.heading}>Rules of the game</Text>
                    <Text style={Styles.rules}>
                        THE GAME: Upper section of the classic Yahtzee dice game. You have 5 dices and for the every dice You
                        have 3 throws. After each throw you can keep dices in order to get same dice spot counts as many as possible.
                        In the end of the turn you must select your points from 1 to 6. Game ends when all points have been selected.
                        The order for selecting those is free.{"\n"}{"\n"}
                        POINTS: After each turn game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated.
                        Inside the game you can not select same pooints from 1 to 6 again.{"\n"}{"\n"}
                        GOAL: To get points as much as possible. 63 points is the limit of getting bonus which gives you 50 points.
                    </Text>
                    <Text style={Styles.info}>Good luck, {name}</Text>
                    <Pressable
                        style={Styles.button}
                        onPress={() => setShowRules(false)}
                    >
                        <Text style={Styles.buttonText}>Play</Text>
                    </Pressable>
                </View>

            )
        } else {
            return (
                <Gameboard />
            )
        }

    }

    return (
        <View style={Styles.container}>
            {!checkName ?
                <View style={Styles.container}>
                    <Text>Enter name:</Text>
                    <TextInput
                        style={Styles.textInput}
                        onChangeText={name => setName(name)}
                        value={name}
                    />
                    <Pressable
                        style={Styles.button}
                        onPress={() => setCheckName(true)}
                    >
                        <Text style={Styles.buttonText}>Enter</Text>
                    </Pressable>
                </View>

                : <Game />}
        </View>
    )
}
