import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#353535'
    },
    fila: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 1,
        backgroundColor: '#353535'       
    },
    columna: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ESTILOS BOTONES
    boton: {
        height: '40%',
        width: '70%',
        backgroundColor: '#337657',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBoton: {
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
        return (
            <View style = { styles.contenedor }>

                {/* MENU_ROW_1 */}
                <View style = { styles.fila }>
                    
                    {/* EVOLUTIÓN BUTTON */}
                    <View style = { styles.columna }>
                        <TouchableOpacity style = { styles.boton } onPress = {() => this.props.navigate('SiteEvolution')}>
                            <Text style = { styles.textoBoton }>EVOLUCIÓN</Text>
                        </TouchableOpacity>
                    </View>{/* END EVOLUTIÓN BUTTON */}
                    
                    {/* NEW_CHALLENGE BUTTON */}
                    <View style = { styles.columna }>
                        <TouchableOpacity style = { styles.boton } onPress = {() => this.props.navigate('SiteNewChallenge')}>
                            <Text style = { styles.textoBoton }>NUEVO RETO</Text>
                        </TouchableOpacity>
                    </View>
                
                </View>{/* END NEW_CHALLENGE BUTTON */}

                {/* MENU_ROW_2 */}
                <View style = { styles.fila }>

                    {/* PROFILE BUTTON */}
                    <View style = { styles.columna }>
                        <TouchableOpacity style = { styles.boton } onPress = {() => this.props.navigate('SiteProfile')}>
                            <Text style = { styles.textoBoton }>PERFIL</Text>
                        </TouchableOpacity>
                    </View>{/* END PROFILE BUTTON */}

                    {/* CONTACT BUTTON */}
                    <View style = { styles.columna }>
                        <TouchableOpacity style = { styles.boton } onPress = {() => this.props.navigate('SiteContact')}>
                            <Text style = { styles.textoBoton }>CONTACTO</Text>
                        </TouchableOpacity>
                    </View>{/* END CONTACT BUTTON */}

                </View>{/* END MENU_ROW_2 */}

            </View>
        )
    }
}