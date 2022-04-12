import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopBar } from '../widgets/TopBar.js'
import { Hero } from '../widgets/Hero.js'
import { NavBar } from '../widgets/NavBar.js'

const styles = StyleSheet.create({
    contenedor: {
        flex: 1   
    },
});

export class HomeScreen extends React.Component {
    render(){
        const { navigate } = this.props.navigation;

        return (
            <View style = { styles.contenedor }>
                <TopBar navigate = { navigate }></TopBar>
                <Hero   navigate = { navigate }></Hero>
                <NavBar navigate = { navigate }></NavBar>
            </View>
        )
    }
}