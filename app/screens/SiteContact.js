import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
    mainContainer: {
        flex: 1.5
    }
});

const SiteContact = ( props ) => {

    const { navigate }  = props.navigation;
    const navBarStyle   = 'COMPLETE_NAVBAR';

    return(
        <View style = { styles.screenContainer }>
            <TopBar
                topText     = 'CONTACTO'
                topButton   = { true }
                textBtn     = 'Home'
                onPress = { () => navigate('HomeScreen') }
            >
            </TopBar>
            <Text style = { styles.mainContainer }>SiteContact</Text>
            <NavBar 
                navigate = { navigate }
                navBarStyle = { navBarStyle }>
            </NavBar>
        </View>
    )

}

export default SiteContact;