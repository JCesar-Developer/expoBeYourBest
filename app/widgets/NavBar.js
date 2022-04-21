import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';

const styles = StyleSheet.create({
    // DISPOSITION
    screenContainer: {
        flex: 1,
        backgroundColor: '#353535'
    },
    oneRowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#383838',
    },
    navRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 1,
        backgroundColor: '#353535'       
    },
    navColumn: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // BOTTONS STYLES
    button: {
        height: '50%',
        width: '70%',
        backgroundColor: '#337657',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        width: '80%',
        height: '80%',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

});


export class NavBar extends React.Component{

    render(){

        const topText = this.props.topText;

        return ( 
            <View style = { styles.screenContainer }>
                
                {/* If is not EvolutionScreen or ChallengeDetailsScreen */}
                { this.isntEvolution( topText ) }

                {/* If is EvolutionScreen or ChallengeDetailsScreen */}
                { this.isEvolution( topText ) }
                
            </View>
        )
    }

    /**
     * CONDITIONAL FUNCTION: If is not EvolutionScreen or ChallengeDetailsScreen -> Show complete_NavBar.
     * @param {*} topText 
     * @returns complete_NavBar
     */
    isntEvolution( topText ) {
        if ( topText != 'EVOLUCIÓN' &&  topText != 'DETALLE RETO' && topText != 'NUEVA CATEGORÍA' ) {
            return (
                <View style = { styles.screenContainer }>

                    {/* MENU_ROW_1 */}
                    <View style = { styles.navRow }>
                        

                        {/* EVOLUTIÓN BUTTON */}
                        <View style = { styles.navColumn }>
                            <TouchableOpacity style = { styles.button } onPress = {() => this.props.navigate('SiteEvolution')}>
                                <Text style = { styles.buttonText }>EVOLUCIÓN</Text>
                            </TouchableOpacity>
                        </View>{/* END EVOLUTIÓN BUTTON */}
                        
                        {/* NEW_CHALLENGE BUTTON */}
                        <View style = { styles.navColumn }>
                            <TouchableOpacity style = { styles.button } onPress = {() => this.props.navigate('SiteNewChallenge')}>
                                <Text style = { styles.buttonText }>NUEVO RETO</Text>
                            </TouchableOpacity>
                        </View>{/* END NEW_CHALLENGE BUTTON */}
                    
                    </View>{/* END MENU_ROW_1 */}

                    {/* MENU_ROW_2 */}
                    <View style = { styles.navRow }>

                        {/* PROFILE BUTTON */}
                        <View style = { styles.navColumn }>
                            <TouchableOpacity style = { styles.button } onPress = {() => this.props.navigate('SiteProfile')}>
                                <Text style = { styles.buttonText }>PERFIL</Text>
                            </TouchableOpacity>
                        </View>{/* END PROFILE BUTTON */}

                        {/* CONTACT BUTTON */}
                        <View style = { styles.navColumn }>
                            <TouchableOpacity style = { styles.button } onPress = {() => this.props.navigate('SiteContact')}>
                                <Text style = { styles.buttonText }>CONTACTO</Text>
                            </TouchableOpacity>
                        </View>{/* END CONTACT BUTTON */}

                    </View>{/* END MENU_ROW_2 */}

                </View>
            )
        }
    }

    /**
     * CONDITIONAL FUNCTION: If is EvolutionScreen or ChallengeDetailsScreen-> Show newChallenge_NavBar.
     * @param {*} topText 
     * @returns newChallenge_NavBar
     */
    isEvolution( topText ) {
        if ( topText == 'EVOLUCIÓN' ||  topText == 'DETALLE RETO' ||  topText == 'NUEVA CATEGORÍA'  ) {
            return (
                <View style = { styles.screenContainer }>
                    
                    {/* NEW_CHALLENGE BUTTON */}
                    <View style = { styles.oneRowContainer }>
                        <TouchableOpacity style = { styles.button } onPress = {() => this.props.navigate('SiteNewChallenge')}>
                            <Text style = { styles.buttonText }>NUEVO RETO</Text>
                        </TouchableOpacity>
                    </View>{/* END NEW_CHALLENGE BUTTON */}

                    {/* NEW_CHALLENGE BUTTON */}
                    <View style = { styles.oneRowContainer }>
                        <TouchableOpacity style = { styles.button } onPress = {() => this.props.navigate('SiteNewCategory')}>
                            <Text style = { styles.buttonText }>NUEVA CATEGORÍA</Text>
                        </TouchableOpacity>
                    </View>{/* END NEW_CHALLENGE BUTTON */}

                </View>
            )
        }
    }

}