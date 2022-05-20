import React from 'react';
import { StyleSheet, Image, Dimensions, View, 
        SafeAreaView, useWindowDimensions, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';

import TopBar from '../../widgets/TopBar.js';

import { app } from '../../utils/Firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


const thisHeight = Dimensions.get("window").height * 1.057;

const styles = StyleSheet.create({
    screenContainer: {
        height: thisHeight,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#353535',
    },
    logo: {
        width: '45%',
        maxWidth: 300,
        maxHeight: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    input: {
        width: '85%',
    },
    errorStyle: {
        color: '#FF6666',
        fontSize: 10,
        marginLeft: 0,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 0,
    },
});


const LoginScreen = ( props ) => {

    const { height } = useWindowDimensions();
    const { navigate } = props.navigation;
    const auth = getAuth(app);

    //USER LOGIN VALUES
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    //USER LOGIN ERROR MESSAGES
    const [ input_error_email, setErrorEmail ] = React.useState('');
    const [ input_error_password, setErrorPassword ] = React.useState('');

    const onSignInPressed = () => {
        const isValid = signInValidation();

        if ( isValid ) {
            handleSignIn();
        }

    }

    const signInValidation = () => {
        
        let canSave = false;

        //VALIDATE: EMAIL
        if( email === '' ){
            canSave = false;
            setErrorEmail( 'Error. Por favor, ingresa tu correo.' );
            return canSave;
        } else {
            canSave = true;
            setErrorEmail('');
        } //END VALIDATE: EMAIL

        //VALIDATE: PASSWORD
        if( password === '' ){
            canSave = false;
            setErrorPassword( 'Error. Por favor, ingresa tu contraseña.' );
        } else {
            canSave = true;
            setErrorPassword('');
        } //END VALIDATE: PASSWORD

        return canSave;

    }

    const handleSignIn = () => {
        const successSignIn = signInWithEmailAndPassword( auth, email, password );
        successSignIn
            .then( () => {
                navigate('HomeScreen');
            })
            .catch( ( error ) => {
                console.log( error );
                Alert.alert( error.message );
            })
    }

    const onForgorPasswordPressed = () => {
        console.warn('Forgor Password Pressed');
    }

    const onSignUpPressed = () => {
        navigate('RegisterScreen');
    }

    return (
        <SafeAreaView style = { styles.screenContainer} >
            <TopBar
                topText     = '"BE YOUR BEST"'
            />

            {/* MAIN CONTAINER */}
            <View style = { styles.mainContainer} >

                {/* IMAGE */}
                <Image
                    source={ require('../../../assets/images/Logo.png') }
                    style={[ styles.logo, { height: height * 0.3 } ]}
                />
                {/* END IMAGE */}
                
                {/* SIGN IN FORM */}
                <View style={ styles.input }>
                    {/* LOGIN INPUT USERNAME */}
                    <Input
                        placeholder='Email'
                        containerStyle={{ marginBottom: -10}}
                        inputStyle={{ fontSize: 15, color: 'white' }}
                        leftIcon={{ name: 'mail' }}
                        errorMessage={ input_error_email }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setEmail(value) }
                    />
                    {/* END LOGIN INPUT USERNAME */}

                    {/* LOGIN INPUT PASSWORD */}
                    <Input
                        placeholder='Contraseña'
                        containerStyle={{ marginTop: -10 }}
                        inputStyle={{ fontSize: 15, color: 'white' }}
                        leftIcon={{ name: 'lock' }}
                        secureTextEntry
                        errorMessage={ input_error_password }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setPassword(value) }
                    />
                    {/* END LOGIN INPUT PASSWORD */}

                    {/* LOGIN BUTTON SIGN IN */}
                    <Button
                        title="Entrar"
                        buttonStyle={{ backgroundColor: '#337657' }}
                        onPress={ onSignInPressed }
                    />
                    {/* END LOGIN BUTTON SIGN IN */}

                    {/* LOGIN BUTTON FORGET PASSWORD? */}
                    <Button
                        title="¿Olvidaste la contraseña?"
                        containerStyle={{ marginTop: 10 }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        titleStyle={{ color: 'white', fontFamily: 'normal' }}
                        onPress={ onForgorPasswordPressed }
                    />
                    {/* END LOGIN BUTTON FORGET PASSWORD? */}

                    {/* LOGIN BUTTON SIGN IN WITH FACEBOOK */}
                    {/* <Button
                        title="Registrarse con Facebook"
                        containerStyle={{ marginTop: 10 }}
                        buttonStyle={{ backgroundColor: '#E7EAF4' }}
                        titleStyle={{ color: '#4765A9' }}
                        onPress={ onForgorPasswordPressed }
                    /> */}
                    {/* END LOGIN BUTTON SIGN IN WITH FACEBOOK */}

                    {/* LOGIN BUTTON SIGN IN WITH GOOGLE */}
                    {/* <Button
                        title="Registrarse con Google"
                        containerStyle={{ marginTop: 10 }}
                        buttonStyle={{ backgroundColor: '#FAE9EA' }}
                        titleStyle={{ color: '#DD4DD4' }}
                        onPress={ onForgorPasswordPressed }
                    /> */}
                    {/* END LOGIN BUTTON SIGN IN WITH GOOGLE */}

                    {/* LOGIN BUTTON SIGN UP */}
                    <Button
                        title="Aún no tengo una cuenta"
                        containerStyle={{ marginTop: 10 }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        titleStyle={{ color: 'white', fontFamily: 'normal', fontStyle: 'italic', fontSize: 12 }}
                        onPress={ onSignUpPressed }
                    />
                    {/* END LOGIN BUTTON SIGN UP */}
                </View>
                {/* END SIGN IN FORM */}
            </View>
            {/* END MAIN CONTAINER */}

        </SafeAreaView>
    )

}

export default LoginScreen;

/**
 * TODO:
 * - Limpiar el código de Sign IN y Sign UP.
 * - Agregar validaciones y mensajes de error.
 * - Que el HOME SCREEN muestre el nombre del usuario.
 * - Crear el REGISTER SCREEN para agregar más campos al usuario. ( Photo & Username )
 * - Crear el PROFILE SCREEN -> Captura con cámara e importación de imágenes.
 */