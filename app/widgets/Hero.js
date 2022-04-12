import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const image = { uri: "https://reactjs.org/logo-og.png" };

const styles = StyleSheet.create({
    contenedor: {
        flex: 1.5,
        backgroundColor: '#353535'
    },
    filaDestacada: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 1,
        backgroundColor: '#353535'
    },
    imagenDestacada: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    botonDestacado: {
        backgroundColor: "#000000c0",
        alignItems: 'center',
    },
    textoDestacado: {
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
            <View style = { styles.contenedor }>

                {/* MAIN CONTAINER */}
                <View style = { styles.filaDestacada }>         
                    <ImageBackground source={image} resizeMode="cover" style={styles.imagenDestacada}>
                        <TouchableOpacity style = { styles.botonDestacado } onPress = {() => this.props.navigate('SiteAchievements')}>
                                <Text style = { styles.textoDestacado }>BIENVENIDO A: "ERES EL MEJOR" APP</Text>
                        </TouchableOpacity>
                    </ImageBackground>    
                </View>{/* MAIN CONTAINER */}
                
            </View>

        )
    }

}
