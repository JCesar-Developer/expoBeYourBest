import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import TopBar from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

import db from '../utils/Firebase.js';
import { doc, getDoc } from "firebase/firestore";


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
    mainContainer: {
        flex: 8
    }
});

const SiteChallengeDetails = ( props ) => {

    // ------------------------------ ATRIBUTES ----------------------------- //

    const { navigate }  = props.navigation;
    const topText       = 'DETALLE RETO';
    const navBarStyle   = 'ONE-COL-BTN';
    const challengeId   = props.route.params.challengeId;

    // -------------------------- STATES MANAGMENT -------------------------- //

    const [ challenge, setChallenge ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getChallengeById();
    }, []);

    const getChallengeById = async () => {

        const querySnapshot = await getDoc(doc( db, "challenges", challengeId));
        setChallenge( querySnapshot.data() );
        setLoading(false);

    }
   
    // ------------------------------- SCREEN ------------------------------- //

    return (
        <View style = { styles.screenContainer }>
            <TopBar
                topText     = 'DETALLE RETO'
                topButton   = { true }
                textBtn     = 'Volver atras'
                onPress = { () => navigate('SiteEvolution') }
            />

            {/* MAIN SCREEN */}            
            <View style = { styles.mainContainer }>
                { loading ? 
                    
                    <ActivityIndicator size="large" color="#9e9e9e" 
                    style={{alignItems: 'center', flex:1}}/>
            
                :

                    <>
                    {/* --- TITLE --- */}
                    <ListItem key = {challengeId} bottomDivider >
                        <Icon name='work' type='material' color='#517fa4'/>
                        <ListItem.Title style = {{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            {challenge.nombre}
                        </ListItem.Title>
                    </ListItem>
                    {/* --- CATEGORY --- */}
                    <ListItem bottomDivider >
                        <Icon name='bookmarks' type='material' color='gray'/>
                        <ListItem.Content>
                            <ListItem.Title>Categoria:</ListItem.Title>
                            <ListItem.Subtitle>{challenge.categoria}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>   
                    {/* --- DETAILS --- */}    
                    <ListItem bottomDivider >
                        <Icon name='description' type='material' color='gray'/>
                        <ListItem.Content>
                            <ListItem.Title>Detalle:</ListItem.Title>
                            <ListItem.Subtitle>{challenge.detalle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    {/* --- TIME --- */}  
                    <ListItem bottomDivider >
                        <Icon name='event' type='material' color='gray'/>
                        <ListItem.Content>
                            <ListItem.Title>Necesitas: {challenge.tiempo} horas, </ListItem.Title>
                            <ListItem.Subtitle>para completar este desafío.</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    {/* --- DECISIONS --- */}
                    <ListItem bottomDivider >
                        <Icon name='schedule' type='material' color='gray'/>
                        <ListItem.Subtitle>
                            Dedicaras: {challenge.periodicidad} horas al día a está actividad. {"\n"}
                            Has completado: {challenge.completado} de está actividad.
                        </ListItem.Subtitle>
                    </ListItem>
                    </>
                }
            </View>
            {/* END MAIN SCREEN */}

            <NavBar 
                BtnTittle   = 'NUEVO RETO'
                navBarStyle = { navBarStyle }
                onPress     = {() => navigate('SiteNewChallenge')}
            />
            <NavBar 
                BtnTittle   = 'NUEVA CATEGORÍA'
                navBarStyle = { navBarStyle }
                onPress     = {() => navigate('SiteNewCategory')}
            />

        </View>
    ) 
    
    // ----------------------------- END SCREEN ----------------------------- //

}

export default SiteChallengeDetails;

/**PENDIENTES:
 * Hacer que cargue el ícono correspondiente a su categoría.
 */