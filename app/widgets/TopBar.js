import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#35606a',   
    },
    headerText: {
        flex: 1,
        textAlign: 'left',
        textAlignVertical: 'center',
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

const TopBar = ( props ) => {

    const navigate  = props.navigate;   //IT'S NECESARY, BECAUSE THIS WIDGET ISN'T IN THE STACKSCREEN
    const topText   = props.topText;
    const onPress   = props.onPress;
    const textBtn   = props.textBtn;

    // ------------------------------------------------------------------------------------ //
    // ----------------------------------- MAIN FUNCTION ---------------------------------- //
    // ------------------------------------------------------------------------------------ //

    return (
        <View>

            <View>

                {/* IF IT'S SHOWING HOMESCREEN */}
                { topText == 'HomeScreen' &&
                <View style={styles.topBarContainer}>
                    <Text 
                    style={styles.headerText}
                    onPress = {() => navigate('LoginScreen')}>
                        Login
                    </Text>
                </View>
                }{/* END IF IT'S SHOWING HOMESCREEN */}

                {/* TODO: MODULARIZAR ESTE BOTÓN */}

                {/* IF ISN'T SHOWING HOMESCREEN */}
                { topText != 'HomeScreen' &&
                <View style={styles.topBarContainer}>
                    <Text style={styles.headerText}>{ topText }</Text>
                    { textBtn &&
                    <TouchableOpacity 
                        style={styles.goHomeButton}
                        onPress = { onPress }>
                        <Text>{ textBtn }</Text>
                    </TouchableOpacity>
                    }
                </View>
                }{/* END IF ISN'T SHOWING HOMESCREEN */}

            </View>
            
        </View>
    );

    // ------------------------------------------------------------------------------------ //
    // ---------------------------------- OTHER FUNTIONS ---------------------------------- //
    // ------------------------------------------------------------------------------------ //

}

export default TopBar;