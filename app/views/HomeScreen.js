import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TopBar } from '../widgets/TopBar.js'
import { Hero } from '../widgets/Hero.js'
import { NavBar } from '../widgets/NavBar.js'

import firebase from '../utils/firebase.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
});



export class HomeScreen extends React.Component {

    componentDidMount() { getChallenges(firebase.db); }

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

/**
 * This fuctions shows if there're data on a firebase collection.
 * @param {*} db require FireStore Database
 */
async function getChallenges(db) {
    const querySnapshot = await getDocs(collection(db, "challenges"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });    
}