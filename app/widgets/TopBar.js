import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    header: {
        paddingTop: 45,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#35606a',   
    },
    headerText: {
        textAlign: 'left',
        color:  '#fff',
        fontSize: 15
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

    render(){
        // let text=this.state.logged? 'Usuario Anonimo': this.props.msj;
        let text = 'LOGIN'

        return (
            <View style={styles.header}>
                <Text onPress={() => this.props.navigate('LoginScreen') } style={styles.headerText}>{text}</Text>
            </View>
        );
    }
}