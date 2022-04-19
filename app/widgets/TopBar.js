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
        );
    }
}

/** TRASH CODE
    //TODO: TO LOGGED?
    // constructor(props){
    //     super(props);
    //     this.state={logged:false};
    // }

    // changeLog = () => {
    //     if (this.state.logged == false) {
    //         this.setState({logged:true});
    //     } else {
    //         this.setState({logged:false});
    //     }
    // }

    // let text=this.state.logged? 'Usuario Anonimo': this.props.msj;

 */