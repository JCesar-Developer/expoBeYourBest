import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TopBar } from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
    mainContainer: {
        flex: 4
    }
});



export class SiteChallengeDetails extends React.Component {
    render(){
        
        const { navigate } = this.props.navigation;
        const challenge = this.props.route.params.item;
        const topText = 'DETALLE RETO'

        return (
            <View style = { styles.screenContainer }>
                <TopBar
                    topText = { topText }
                    navigate = { navigate }>
                </TopBar>
                
                <View style = { styles.mainContainer }>
                    <Text>{challenge.nombre}</Text>
                    <Text>{challenge.detalle}</Text>
                    <Text>{challenge.periodicidad}</Text>
                    <Text>{challenge.tiempo}</Text>
                    <Text>{challenge.completado}</Text>
                </View>
                
                <NavBar 
                    topText = { topText }
                    navigate = { navigate }>
                </NavBar>
            </View>
        )
    }
}