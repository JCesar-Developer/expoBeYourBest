import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopBar } from '../widgets/TopBar.js';

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,   
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#353535',
    }

});


export class LoginScreen extends React.Component {
    render(){

        const { navigate } = this.props.navigation;

        return (
            <View style = { styles.loginContainer} >
                <TopBar
                    topText = {'REGISTRATE'}
                    navigate = { navigate }>
                </TopBar>
                <View style = { styles.mainContainer} >
                    <Text>
                        Este sitio está reservado para el Login
                    </Text>
                </View>
            </View>
        )
    }
}