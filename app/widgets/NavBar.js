import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

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
        borderRadius: 10,
        justifyContent: 'center',
    },
    textBtn: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

});


export class NavBar extends React.Component{

    render(){

        const topText       = this.props.topText;
        const navBarStyle   = this.props.navBarStyle;

        const BtnTittle     = this.props.BtnTittle;
        const BtnBgColor    = this.props.BtnBgColor;
        const onPress       = this.props.onPress;


        return ( 
            <View style = { styles.screenContainer }>
                
                {/* If is not EvolutionScreen or ChallengeDetailsScreen */}
                { this.show_complete_navBar( navBarStyle ) }

                {/* If is EvolutionScreen or ChallengeDetailsScreen */}
                { this.show_One_Colum( navBarStyle ) }

            </View>
        )
    }

    /**
     * CONDITIONAL FUNCTION: If is not EvolutionScreen or ChallengeDetailsScreen -> Show complete_NavBar.
     * @param {*} topText 
     * @returns complete_NavBar
     */
     show_complete_navBar( navBarStyle ) {
        if ( navBarStyle == 'COMPLETE_NAVBAR' ) {
            return (
                <View style = { styles.screenContainer }>

                    {/* MENU_ROW_1 */}
                    <View style = { styles.navRow }>
                    

                        {/* EVOLUTIÓN BUTTON */}
                        <View style = { styles.navColumn }>
                            <TouchableOpacity style = {[ styles.button, { backgroundColor: '#337657'} ]} 
                            onPress = {() => this.props.navigate('SiteEvolution')}>
                                <Text style = { styles.textBtn }>EVOLUCIÓN</Text>
                            </TouchableOpacity>
                        </View>{/* END EVOLUTIÓN BUTTON */}
                        
                        {/* NEW_CHALLENGE BUTTON */}
                        <View style = { styles.navColumn }>
                            <TouchableOpacity style = {[ styles.button, { backgroundColor: '#337657'} ]} 
                            onPress = {() => this.props.navigate('SiteNewChallenge')}>
                                <Text style = { styles.textBtn }>NUEVO RETO</Text>
                            </TouchableOpacity>
                        </View>{/* END NEW_CHALLENGE BUTTON */}
                    
                    </View>{/* END MENU_ROW_1 */}

                    {/* MENU_ROW_2 */}
                    <View style = { styles.navRow }>

                        {/* PROFILE BUTTON */}
                        <View style = { styles.navColumn }>
                            <TouchableOpacity style = {[ styles.button, { backgroundColor: '#337657'} ]} 
                            onPress = {() => this.props.navigate('SiteProfile')}>
                                <Text style = { styles.textBtn }>PERFIL</Text>
                            </TouchableOpacity>
                        </View>{/* END PROFILE BUTTON */}

                        {/* CONTACT BUTTON */}
                        <View style = { styles.navColumn }>
                            <TouchableOpacity style = {[ styles.button, { backgroundColor: '#337657'} ]}  
                            onPress = {() => this.props.navigate('SiteContact')}>
                                <Text style = { styles.textBtn }>CONTACTO</Text>
                            </TouchableOpacity>
                        </View>{/* END CONTACT BUTTON */}

                    </View>{/* END MENU_ROW_2 */}

                </View>
            )
        }
    }

    show_One_Colum( navBarStyle ) {
        if ( navBarStyle == 'ONE-COL-BTN' ) {
            return (
                <View style = { styles.screenContainer }>
                    <View style = { styles.oneRowContainer }>
                        <TouchableOpacity onPress={this.props.onPress} style = { [styles.button, {
                            backgroundColor: this.props.BtnBgColor ? this.props.BtnBgColor : '#337657',
                        }] }>
                            <Text style = { styles.textBtn }>{this.props.BtnTittle}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

}