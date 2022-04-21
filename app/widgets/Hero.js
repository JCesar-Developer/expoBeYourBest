import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const image = { uri: "https://reactjs.org/logo-og.png" };

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1.5,
        backgroundColor: '#353535'
    },
    highlighted_row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 1,
        backgroundColor: '#353535'
    },
    highlighted_image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    highlighted_button: {
        backgroundColor: "#000000c0",
        alignItems: 'center',
    },
    highlighted_text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
    },
})

export class Hero extends React.Component {

    render() {
        return (
            <View style = { styles.screenContainer }>

                {/* MAIN CONTAINER */}
                <View style = { styles.highlighted_row }>         
                    <ImageBackground source={image} resizeMode="cover" style={styles.highlighted_image}>
                        <TouchableOpacity style = { styles.highlighted_button } onPress = {() => this.props.navigate('SiteAchievements')}>
                                <Text style = { styles.highlighted_text }>BIENVENIDO A: "ERES EL MEJOR" APP</Text>
                        </TouchableOpacity>
                    </ImageBackground>    
                </View>{/* MAIN CONTAINER */}
                
            </View>

        )
    }

}
