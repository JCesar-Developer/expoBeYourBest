import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopBar } from '../widgets/TopBar.js';

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


export class SiteAchievements extends React.Component {
    render(){

        const { navigate } = this.props.navigation;

        return (
            <View style = { styles.screenContainer} >
                <TopBar
                    topText = {'TUS ESTADÍSTICAS'}
                    navigate = { navigate }>
                </TopBar>
                <View style = { styles.mainContainer} >
                    <Text>
                        Aquí, puedes ver tus estadísticas.
                    </Text>
                </View>
            </View>
        )
    }
}