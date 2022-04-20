import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TopBar } from '../widgets/TopBar.js'
import { Hero } from '../widgets/Hero.js'
import { NavBar } from '../widgets/NavBar.js'

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
});

export class HomeScreen extends React.Component {
    render(){
        
        const { navigate } = this.props.navigation;
        const topText = 'HomeScreen';

        return (
            <View style = { styles.screenContainer }>
                <TopBar
                    navigate = { navigate } 
                    topText = { topText }>
                </TopBar>
                <Hero   navigate = { navigate }></Hero>
                <NavBar 
                    navigate = { navigate }
                    topText = { topText }>
                </NavBar>
            </View>
        )
    }
}