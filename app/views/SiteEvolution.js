import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed'

import { TopBar } from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

import firebase from '../utils/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
    mainContainer: {
        flex: 4
    }
});

//¿Hará falta una clase?
class Challenge {

    constructor(user_id, id, categoria, nombre, detalle, periodicidad, tiempo, completado, estado){
        this.user_id      = user_id;
        this.id           = id;
        this.categoria    = categoria;
        this.nombre       = nombre;
        this.detalle      = detalle;
        this.periodicidad = periodicidad;
        this.tiempo       = tiempo;
        this.completado   = completado;
        this.estado       = estado;
    }

}

const challengesList = [];

//PRIMERO LLAMAMOS A LA LISTA
async function getChallenges(db) {
    const querySnapshot = await getDocs(collection(db, "challenges"));
    querySnapshot.forEach((doc) => {
        const { user_id, id, categoria, nombre, detalle, periodicidad, tiempo, completado, estado } = doc.data();
        challengesList.push(
        new Challenge( user_id, id, categoria, nombre, detalle, periodicidad, tiempo, completado, estado )
        )});    
}

getChallenges(firebase.db)
console.log(challengesList);

//LUEGO LA METEMOS EN EL FLATLIST

export class SiteEvolution extends React.Component {

    render(){
        const { navigate } = this.props.navigation;
        const topText = 'EVOLUCIÓN';

        return(
            <View style = { styles.screenContainer }>
                <TopBar
                    topText = { topText }
                    navigate = { navigate }></TopBar>
                <Text style = { styles.mainContainer }>SiteEvolution</Text>
                <NavBar 
                    topText = { topText }
                    navigate = { navigate }>
                </NavBar>
            </View>
        )
    }
}