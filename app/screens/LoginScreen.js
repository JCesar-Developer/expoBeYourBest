import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../widgets/TopBar.js';

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,   
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#353535',
    }

});


const LoginScreen = ( props ) => {

    const { navigate } = props.navigation;

    return (
        <View style = { styles.screenContainer} >
            <TopBar
                topText     = 'REGISTRATE'
                topButton   = { true }
                textBtn     = 'Home'
                onPress = { () => navigate('HomeScreen') }
            >
            </TopBar>
            <View style = { styles.mainContainer} >
                <Text>
                    Este sitio está reservado para el Login
                </Text>
            </View>
        </View>
    )

}

export default LoginScreen;