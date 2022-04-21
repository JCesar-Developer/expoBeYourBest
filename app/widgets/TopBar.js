import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#35606a',   
    },
    headerText: {
        textAlign: 'left',
        color:  '#fff',
        fontSize: 15
    },
    goHomeButton: {
        alignItems: 'center',
        marginEnd: 10,
        borderRadius: 5,
        backgroundColor: '#DDDDDD',
        padding: 5
    }
});

export class TopBar extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

        let topText = this.props.topText

        return (
            <View>

                {/* If is not ChallengeDetailsScreen */}
                { this.isntChallengeDetails( topText ) }

                {/* If is not ChallengeDetailsScreen */}
                { this.isChallengeDetails( topText ) }
                
            </View>
        );
    }

    /**
     * CONDITIONAL FUNCTION: If is not ChallengeDetailsScreen -> shows topBar.
     * @param {*} topText 
     * @returns TopBar with COMEBACK TO EVOLUTION button
     */
    isntChallengeDetails( topText ) {
        if ( topText != 'DETALLE RETO' ) {
            return (
                <View>

                {/* IF IT'S INTO LOGIN */}
                { this.props.topText == 'HomeScreen' &&
                <View style={styles.topBarContainer}>
                    <Text 
                        style={styles.headerText}
                        onPress = {() => this.props.navigate('LoginScreen')}>
                            Login
                    </Text>
                </View>
                }{/* END IF IT'S INTO LOGIN */}
                
                {/* IF IT ISN'T INTO LOGIN */}
                { this.props.topText != 'HomeScreen' &&
                <View style={styles.topBarContainer}>
                    <Text style={styles.headerText}>{topText}</Text>
                    <TouchableOpacity 
                        style={styles.goHomeButton}
                        onPress = {() => this.props.navigate('HomeScreen')}>
                        <Text>Home</Text>
                    </TouchableOpacity>
                </View>
                }{/* END IF IT ISN'T INTO LOGIN */}

                </View>
            )
        }
    }

    /**
     * CONDITIONAL FUNCTION: If is ChallengeDetailsScreen -> shows comebackToEvolution_button.
     * @param {*} topText 
     * @returns TopBar with COMEBACK TO EVOLUTION button
     */
     isChallengeDetails( topText ) {
        if ( topText == 'DETALLE RETO' ) {
            return (
                <View>

                {/* IF IT'S INTO LOGIN */}
                { this.props.topText == 'HomeScreen' &&
                <View style={styles.topBarContainer}>
                    <Text 
                        style={styles.headerText}
                        onPress = {() => this.props.navigate('LoginScreen')}>
                            Login
                    </Text>
                </View>
                }{/* END IF IT'S INTO LOGIN */}
                
                {/* IF IT ISN'T INTO LOGIN */}
                { this.props.topText != 'HomeScreen' &&
                <View style={styles.topBarContainer}>
                    <Text style={styles.headerText}>{topText}</Text>
                    <TouchableOpacity 
                        style={styles.goHomeButton}
                        onPress = {() => this.props.navigate('SiteEvolution')}>
                        <Text>Volver atras</Text>
                    </TouchableOpacity>
                </View>
                }{/* END IF IT ISN'T INTO LOGIN */}

                </View>
            )
        }
    }

}