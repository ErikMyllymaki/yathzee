import { StyleSheet } from "react-native";


export default StyleSheet.create({
    app: {
      flex: 1,
      backgroundColor: '#fff',
    },

    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    header: {
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },

    title: {
        color: 'white',
        padding: 15,
        fontSize: 23
    },

    footer: {
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E6EEFF',
    },

    author: {
        color: 'white',
        padding: 15,
        fontSize: 15
    },

    button: {
        backgroundColor: 'tomato',
        borderRadius: 6,
        marginTop: 10,
        alignItems: 'center',
    },

    buttonText: {
        padding: 10,
        color: 'white',
        paddingHorizontal: 20,
    },

    textInput: {
        marginTop: 5,
        padding: 10,
        backgroundColor: 'tomato',
        borderRadius: 6,
        width: 150,
        color: 'white'
    },

    info: {
        fontSize: 20,
        marginBottom: 10
    },

    heading: {
        fontSize: 22,
        fontWeight: 'bold',
    },

    rules: {
        padding: 20
    },

    flex: {
        flexDirection: "row"
      },
    
    score: {
        borderBottomWidth: 1,
        borderBottomColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    scoreText: {
        color: 'tomato',
        fontWeight: 'bold',
    }
  });