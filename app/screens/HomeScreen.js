import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../utils/Firebase.js';


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
    
    const user          = getAuth().currentUser;
    const userUID       = user.uid.toString();
    const [ userData, setUserData ] = React.useState('');

    React.useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {

        const docRef = doc( db, 'users', userUID );
        const docSnap = await getDoc( docRef );
        setUserData( docSnap.data() );

    }

    return (
        <View style = { styles.screenContainer }>
            
            <TopBar
                topText = { 'Bienvenido ' + userData.username } 
                navigate = { navigate } >
            </TopBar>

            <Hero navigate = { navigate }></Hero>

            <NavBar 
                navigate = { navigate }
                navBarStyle = 'COMPLETE_NAVBAR'>
            </NavBar>

        </View>
    )

}

export default HomeScreen;

