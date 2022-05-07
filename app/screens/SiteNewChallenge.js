import React, { useEffect, useState }  from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView,Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';

import TopBar from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

import db from '../utils/Firebase.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
    mainContainer: {
        flex: 8
    },
    inputGroup: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    errorStyle: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 0,
    },
});

const Sitechallenge = ( props ) => {

    // ------------------------------ ATRIBUTES ----------------------------- //

    const { navigate }  = props.navigation;
    const navBarStyle   = 'ONE-COL-BTN'

    // -------------------------- STATES MANAGMENT -------------------------- //
  
    const [input_error_nombre, setErrorName] = useState('');
    const [input_error_categoria, setErrorCategory] = useState('');
    const [input_error_detalle, setErrorDetail] = useState('');
    const [input_error_completado, setErrorComplete] = useState('');
    const [input_error_periodicidad, setPeriodicity] = useState('');
    const [input_error_tiempo, setErrorTime] = useState('');
    const [challenge, setchallenge] = useState({
        nombre: '',
        categoria: '',
        detalle: '',
        completado: 0,
        periodicidad: '',
        tiempo: '',
        user_id: '',
    });

    // ------------------------------ FUNCTIONS ----------------------------- //

    const handleChangeText = ( nombre, value ) => {
        setchallenge({...challenge, [nombre]: value})
    } //END HANDLE_CHANGE_TExT()

    const saveNewChallenge = ( newChallenge ) => {
    
        const isValid = inputValidate( newChallenge );
        
        if ( isValid ) {
            saveValidChallenge( newChallenge )
        } else {
            setchallenge( { ...challenge } );
        }
    
    } //END SAVE_NEW_RETO()

    const inputValidate = ( newChallenge ) => {
    
        let canSave = false;

        //VALIDATE: NOMBRE
        if( newChallenge.nombre === '' ){
            canSave = false;
            setErrorName( 'Por favor, añade un nombre.' );
        } else {
            canSave = true;
            setErrorName('');
        } //END VALIDATE: NOMBRE
    
        //VALIDATE: CATEGORÍA
        if( newChallenge.categoria === '' ){
            canSave = false;
            setErrorCategory( 'Por favor, escoge una categoría.' );
        } else {
            canSave = true;
            setErrorCategory('');
        } //END VALIDATE: CATEGORÍA
    
        //VALIDATE: DETALLE
        if( newChallenge.detalle === '' ){
            canSave = false;
            setErrorDetail( 'Por favor, escribe un breve detalle de tu reto.' );
        } else {
            canSave = true;
            setErrorDetail('');
        } //END VALIDATE: DETALLE
    
        //VALIDATE: COMPLETADO
        if( newChallenge.completado === '' ){
            canSave = true;
            setchallenge( {...challenge } );
        } else if( (challenge.completado !== '') && isNaN( newChallenge.completado ) ){
            canSave = false;
            setErrorComplete( 'Por favor, escoge un valor numérico.' );
        } else{
            canSave = true;
            setErrorComplete('');
        } //END VALIDATE: COMPLETADO
    
        //VALIDATE: PERIODICITY
        if( newChallenge.periodicidad === '' ){
            canSave = false;
            setPeriodicity( 'Por favor, indica cuantas horas dedicarás a la semana.' );
        } else if( isNaN( newChallenge.periodicidad ) ){
            canSave = false;
            setPeriodicity( 'Por favor, escoge un valor numérico. Ejem. "1", "0", "10"' );
        } else {
            canSave = true;
            setPeriodicity( '' );
        } //END VALIDATE: PERIODICITY
    
        //VALIDATE: TIEMPO
        if( newChallenge.tiempo === '' ){
            canSave = false;
            setErrorTime( 'Por favor, indica las horas totales del reto.' );
        } else if( isNaN( newChallenge.tiempo ) ){
            canSave = false;
            setErrorTime( 'Por favor, escoge un valor numérico. Ejem. "1", "0", "10"' );
        } else {
            canSave = true;
            setErrorTime('');
        } //END VALIDATE: TIEMP
        
        return canSave;

    } //END INPUT_VALIDATE()

    const saveValidChallenge = async ( newChallenge ) => {

        await addDoc(collection( db, "challenges"), {
            nombre:       newChallenge.nombre,
            categoria:    newChallenge.categoria,
            detalle:      newChallenge.detalle,
            completado:   newChallenge.completado,
            periodicidad: newChallenge.periodicidad,
            tiempo:       newChallenge.tiempo,
            user_id: 1,
        })

        Alert.alert( 'El nuevo reto se ha agregado correctamente.' );
        navigate( 'SiteEvolution' );

    } //END SAVE_VALID_CHALLENGE()

    // ------------------------------- SCREEN ------------------------------- //
    
    return(
        <SafeAreaView style = { styles.screenContainer }>
            <TopBar
                topText     = 'NUEVO RETO'
                topButton   = { true }
                textBtn     = 'Volver atras'
                onPress     = { () => navigate('SiteEvolution') }
            />

            {/* MAIN SCREEN */}   
            <View style={styles.mainContainer}>

                <View style={{marginVertical: 10, marginHorizontal: 18}}>
                    <Text style={{ color: 'rgb(53, 96, 106)', fontSize: 35, fontWeight: 'bold' }}>
                        NUEVO RETO
                    </Text>
                    <Text style={{ color: 'grey', fontSize: 15 }}>
                        Crea tu nuevo reto personalizado.
                    </Text>
                </View>

                <ScrollView>
                    <View style={styles.inputGroup}>
                        <Input label="Nombre:"
                            placeholder="Escribe el nombre de tu reto."
                            inputStyle={{fontSize: 15}}
                            errorMessage={ input_error_nombre }
                            errorStyle={ styles.errorStyle }
                            onChangeText={(value) => handleChangeText('nombre', value)}/>
                    </View>
                    <View style={styles.inputGroup}>
                        <Input label="Categoría:"
                            placeholder="Escoge una categoría." 
                            inputStyle={{fontSize: 15}}
                            errorMessage={ input_error_categoria }
                            errorStyle={ styles.errorStyle }
                            onChangeText={(value) => handleChangeText('categoria', value)}/>
                    </View>
                    <View style={styles.inputGroup}>
                        <Input label="Detalle:"
                            placeholder="Describe tu reto de manera precisa." 
                            inputStyle={{fontSize: 15}}
                            errorMessage={ input_error_detalle }
                            errorStyle={ styles.errorStyle }
                            onChangeText={(value) => handleChangeText('detalle', value)}/>
                    </View>
                    <View style={styles.inputGroup}>
                        <Input label="Completado:"
                            placeholder="¿Qué porcentaje has completado?" 
                            inputStyle={{fontSize: 15}}
                            errorMessage={ input_error_completado }
                            errorStyle={ styles.errorStyle }
                            onChangeText={(value) => handleChangeText('completado', value)}/>
                    </View>
                    <View style={styles.inputGroup}>
                        <Input label="Periodicidad:"
                            placeholder="¿Cuántas horas le dedicarás a la semana?" 
                            inputStyle={{fontSize: 15}}
                            errorMessage={ input_error_periodicidad }
                            errorStyle={ styles.errorStyle }
                            onChangeText={(value) => handleChangeText('periodicidad', value)}/>
                    </View>
                    <View style={styles.inputGroup}>
                        <Input label="Tiempo total:" 
                            placeholder="¿Cuánto tiempo tomará completar este reto?" 
                            inputStyle={{fontSize: 15}}
                            errorMessage={ input_error_tiempo }
                            errorStyle={ styles.errorStyle }
                            onChangeText={(value) => handleChangeText('tiempo', value)}/>
                    </View>
                </ScrollView>
            </View>
            {/* END MAIN SCREEN */}

            <NavBar 
                BtnTittle   = 'GUARDAR'
                navBarStyle = { navBarStyle }
                navigate    = { navigate }
                onPress     = { () => saveNewChallenge( challenge ) }
            />
            <NavBar 
                BtnTittle   = 'CANCELAR'
                BtnBgColor  = '#A24857'
                navBarStyle = { navBarStyle }
                navigate    = { navigate }
                onPress     = { () => navigate('SiteEvolution') }
            />
        </SafeAreaView>
    )

}

// ------------------------------------------------------------------------------------ //
// ---------------------------------- OTHER FUNTIONS ---------------------------------- //
// ------------------------------------------------------------------------------------ //



export default Sitechallenge;