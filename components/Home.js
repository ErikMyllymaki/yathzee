import React, { useState, useEffect } from 'react';
import Styles from '../style/Styles';
import { View, Text, Pressable, TextInput } from 'react-native';
import Gameboard from './Gameboard';


export default function Home() {

    const [name, setName] = useState('');
    const [checkName, setCheckName] = useState(false);
    const [showRules, setShowRules] = useState(true);

    const Game = () => {

        if (showRules) {
            return (
                <View style={Styles.container}>
                    <Text>{name}</Text>
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
                        <Text style={Styles.buttonText}>OK</Text>
                    </Pressable>
                </View>

                : <Game />}
        </View>
    )
}
