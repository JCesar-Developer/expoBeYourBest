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
        textAlign: 'right',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 2
    }
});

export class TopBar extends React.Component {


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

    constructor(props){
        super(props);
    }

    isHomeScreen() {
        
    }

    render(){
        // let text=this.state.logged? 'Usuario Anonimo': this.props.msj;
        let topText = this.props.topText

        return (
            <View>

                { this.props.topText == 'LOGIN' &&
                <View style={styles.topBarContainer}>
                    <Text 
                        style={styles.headerText}
                        onPress = {() => this.props.navigate('LoginScreen')}>
                            {topText}
                    </Text>
                </View>
                }
                
                { this.props.topText != 'LOGIN' &&
                <View style={styles.topBarContainer}>
                    <Text style={styles.headerText}>{topText}</Text>
                    <TouchableOpacity 
                        style={styles.goHomeButton}
                        onPress = {() => this.props.navigate('HomeScreen')}>
                        <Text>Home</Text>
                    </TouchableOpacity>
                </View>
                }
                
            </View>
        );
    }
}