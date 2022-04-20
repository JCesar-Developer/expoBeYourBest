import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopBar } from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
    mainContainer: {
        flex: 6
    }
});

export class SiteChallengeDetails extends React.Component {
    render(){
        
        const { navigate } = this.props.navigation;
        const topText = 'DETALLE RETO'

        return (
            <View style = { styles.screenContainer }>
                <TopBar
                    topText = { topText }
                    navigate = { navigate }>
                </TopBar>
                <Text style = { styles.mainContainer }>Detalles del reto</Text>
                <NavBar 
                    topText = { topText }
                    navigate = { navigate }>
                </NavBar>
            </View>
        )
    }
}