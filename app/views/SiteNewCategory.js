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

export class SiteNewCategory extends React.Component {
    
    render(){
        const { navigate } = this.props.navigation;
        const topText = 'NUEVA CATEGORÍA';

        return(
            <View style = { styles.screenContainer }>
                <TopBar
                    topText = { topText }
                    navigate = { navigate }></TopBar>
                <Text style = { styles.mainContainer }>SiteNewCategory</Text>
                <NavBar 
                    topText = { topText }
                    navigate = { navigate }>
                </NavBar>
            </View>
        )
    }
}