import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { TopBar } from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
    mainContainer: {
        flex: 4
    }
});



export class SiteChallengeDetails extends React.Component {
    render(){
        
        const { navigate } = this.props.navigation;
        const challenge = this.props.route.params.item;
        const topText = 'DETALLE RETO'

        return (
            <View style = { styles.screenContainer }>
                <TopBar
                    topText = { topText }
                    navigate = { navigate }>
                </TopBar>
                
                <View style = { styles.mainContainer }>
                    {/* --- TITLE --- */}
                    <ListItem key = {challenge.id} bottomDivider >
                        <Icon name='work' type='material' color='#517fa4'/>
                        <ListItem.Title style = {{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            {challenge.nombre}
                        </ListItem.Title>
                    </ListItem>
                    {/* --- CATEGORY --- */}
                    <ListItem key = {challenge.id} bottomDivider >
                        <Icon name='bookmarks' type='material' color='gray'/>
                        <ListItem.Content>
                            <ListItem.Title>Categoria:</ListItem.Title>
                            <ListItem.Subtitle>{challenge.categoria}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>   
                    {/* --- DETAILS --- */}             
                    <ListItem key = {challenge.id} bottomDivider >
                        <Icon name='description' type='material' color='gray'/>
                        <ListItem.Content>
                            <ListItem.Title>Detalle:</ListItem.Title>
                            <ListItem.Subtitle>{challenge.detalle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    {/* --- TIME --- */}   
                    <ListItem key = {challenge.id} bottomDivider >
                        <Icon name='event' type='material' color='gray'/>
                        <ListItem.Content>
                            <ListItem.Title>Necesitas: {challenge.tiempo} horas, </ListItem.Title>
                            <ListItem.Subtitle>para completar este desafío.</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    {/* --- DECISIONS --- */}   
                    <ListItem key = {challenge.id} bottomDivider >
                        <Icon name='schedule' type='material' color='gray'/>
                        <ListItem.Subtitle>
                            Dedicaras: {challenge.periodicidad} horas al día a está actividad. || 
                            Has completado: {challenge.completado} de está actividad
                        </ListItem.Subtitle>
                    </ListItem>
                </View>
                
                <NavBar 
                    topText = { topText }
                    navigate = { navigate }>
                </NavBar>
            </View>
        )
    }
}