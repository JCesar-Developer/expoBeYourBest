import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopBar } from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

const styles = StyleSheet.create({
    contenedor: {
        flex: 1   
    },
    mainContainer: {
        flex: 1.5
    }
});

export class SiteContact extends React.Component {
    render(){
        const { navigate } = this.props.navigation;

        return(
            <View style = { styles.contenedor }>
                <TopBar
                    topText = {'CONTACTO'}
                    navigate = { navigate }></TopBar>
                <Text style = { styles.mainContainer }>SiteContact</Text>
                <NavBar navigate = { navigate }></NavBar>
            </View>
        )
    }
}