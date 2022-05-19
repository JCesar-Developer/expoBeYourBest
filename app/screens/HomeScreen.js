import React from 'react';
import { StyleSheet, View } from 'react-native';

import TopBar from '../widgets/TopBar.js'
import { Hero } from '../widgets/Hero.js'
import { NavBar } from '../widgets/NavBar.js'

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
});

const HomeScreen = ( props ) => {

    const { navigate }  = props.navigation;
    const topText       = 'HomeScreen';
    const navBarStyle   = 'COMPLETE_NAVBAR';

    return (
        <View style = { styles.screenContainer }>
            <TopBar
                topText = { topText }
                navigate = { navigate } >
            </TopBar>
            <Hero   navigate = { navigate }></Hero>
            <NavBar 
                navigate = { navigate }
                navBarStyle = { navBarStyle }>
            </NavBar>
        </View>
    )

}

export default HomeScreen;

