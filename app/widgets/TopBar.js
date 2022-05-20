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
    
    //PROPS:
    const topText   = props.topText;    //TEXT THAT SHOWS TE TOP BAR.
    const textBtn   = props.textBtn;    //OPTION THAN SHOWS TOP BUTTON AND ITS TEXT BUTTON
    const onPress   = props.onPress;    //ON PRESS, JUST IF YOU SHOWS THE BUTTON.


    // ------------------------------------------------------------------------------------ //
    // ----------------------------------- MAIN FUNCTION ---------------------------------- //
    // ------------------------------------------------------------------------------------ //

    return (
        <View>
        
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
            
        </View>
    );

    // ------------------------------------------------------------------------------------ //
    // ---------------------------------- OTHER FUNTIONS ---------------------------------- //
    // ------------------------------------------------------------------------------------ //

}

export default TopBar;