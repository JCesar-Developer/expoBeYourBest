import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { ListItem, Badge, Icon } from 'react-native-elements';

import { TopBar } from '../widgets/TopBar.js';
import { NavBar } from '../widgets/NavBar.js';

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

//TODO: MODULARIZAR ESTE MODELO
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

//TODO: MODULARIZAR ESTE CRUD
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

//LUEGO LO RENDERIZAMOS
const renderChallengesList = ( { item }, navigate ) => {

    return (
        <ListItem key = {item.id} bottomDivider onPress={() => {
            navigate( 'SiteChallengeDetails', { item: item } );
        }}>

            {/*
            https://reactnativeelements.com/docs/3.4.2/icon
            https://fonts.google.com/icons?selected=Material+Icons
            */}
            <Icon
                name='work'
                type='material'
                color='#517fa4'
            />

            <ListItem.Content>
                <ListItem.Title>{item.nombre}</ListItem.Title>
                <ListItem.Subtitle>{item.detalle}</ListItem.Subtitle>
                <ListItem.Subtitle>Total: {item.tiempo} horas || Necesitas: {item.periodicidad}h. diaria</ListItem.Subtitle>
            </ListItem.Content>
            
            <Badge
                value = {item.completado}
                badgeStyle = {{ backgroundColor: '#35606a', paddingTop: 15, 
                paddingBottom: 15, paddingStart: 8, paddingEnd: 8 }}  
                textStyle = {{ color: 'white' }}
            />
            <ListItem.Chevron color="gray" />
        
        </ListItem>
    )

}

export class SiteEvolution extends React.Component {

    render(){
        const { navigate } = this.props.navigation;
        const topText = 'EVOLUCIÓN';

        return(
            <View style = { styles.screenContainer }>
                <TopBar
                    topText = { topText }
                    navigate = { navigate }>
                </TopBar>

                
                <View style = { styles.mainContainer }>
                    <ScrollView>
                        <FlatList data={ challengesList } renderItem={ (item) => renderChallengesList( item, navigate ) } />
                    </ScrollView>
                </View>
                
                {/* 
                <View style = { styles.mainContainer }>
                    <ScrollView>

                        { challengesList.map((item) => {

                            return (
                                <ListItem key = {item.id} bottomDivider onPress={() => {
                                    navigate('SiteChallengeDetails');
                                }}>
                                    <Badge
                                        value = {item.completado}
                                        badgeStyle = {{ backgroundColor: '#35606a', paddingTop: 15, 
                                        paddingBottom: 15, paddingStart: 8, paddingEnd: 8 }}  
                                        textStyle = {{ color: 'white' }}
                                    />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.nombre}</ListItem.Title>
                                        <ListItem.Subtitle>{item.detalle}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Total: {item.tiempo} horas || Necesitas: {item.periodicidad}h. diaria</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron color="gray" />
                                </ListItem>
                            )

                        })}

                    </ScrollView>
                </View>
                */}
                

                <NavBar 
                    topText = { topText }
                    navigate = { navigate }>
                </NavBar>
            </View>
        )
    }
}