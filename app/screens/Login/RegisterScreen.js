import React from 'react';
import { StyleSheet, Text, Dimensions, View, 
        SafeAreaView, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';

import TopBar from '../../widgets/TopBar.js';

import { app, db } from '../../utils/Firebase.js';
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

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

const RegisterScreen = ( props ) => {

    const { navigate } = props.navigation;
    const auth = getAuth(app);

    //INPUT USER FORM
    const [ username, setUsername] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ repPassword, setRepPassword ] = React.useState('');
    const [ description, setDescription ] = React.useState('');

    //ERROR MESSAGES INPUT USER FORM
    const [ input_error_username, setErrorUsername ] = React.useState('');
    const [ input_error_email, setErrorEmail ] = React.useState('');
    const [ input_error_password, setErrorPassword ] = React.useState('');
    const [ input_error_repPassword, setErrorRepPassword ] = React.useState('');
    const [ input_error_description, setErrorDescription ] = React.useState('');

    const onSignUpPressed = () => {

        const isValid = signUpUserValidation();

        if ( isValid ) {
            handleCreateAccount();
        }

    } //END ON_SIGN_UP_PRESSED()

    const signUpUserValidation = () => {
        
        let canSave = false;

        //VALIDATE: USERNAME
        if( username === '' ){
            canSave = false;
            setErrorUsername( 'Por favor, añade un nombre de usuario.' );
        } else {
            canSave = true;
            setErrorUsername('');
        } //END VALIDATE: USERNAME

        //VALIDATE: EMAIL
        if( email === '' ){
            canSave = false;
            setErrorEmail( 'Por favor, ingrese su correo electrónico.' );
        } else {
            canSave = true;
            setErrorEmail('');
        } //END VALIDATE: EMAIL

        //VALIDATE: PASSWORD
        if( password === '' ){
            canSave = false;
            setErrorPassword( 'La contraseña debe tener mínimo 6 caracteres.' );
        } else {
            canSave = true;
            setErrorPassword('');
        } //END VALIDATE: PASSWORD

        //VALIDATE: REPITE-PASSWORD
        if( password !== repPassword ){
            canSave = false;
            setErrorRepPassword( 'Las contraseñas no coinciden.' );
            return canSave;
        } else {
            canSave = true;
            setErrorRepPassword('');
        } //END VALIDATE: REPITE-PASSWORD

        //VALIDATE: DESCRIPTION
        if( description === ''){
            canSave = false;
            setErrorDescription( 'Por favor, agrega una pequeña descripción de tus objetivos.' );
        } else {
            canSave = true;
            setErrorDescription('');
        } //END VALIDATE: DESCRIPTION

        return canSave;

    }

    //TODO: CAMBIAR ESTAS ALERTAS POR ALGO MÁS VISTOSO.
    const handleCreateAccount = () => {
        const successSignUp = createUserWithEmailAndPassword( auth, email, password );
        successSignUp
            .then(( userCredential ) => {
                saveValidUser( userCredential );
                Alert.alert( 'Usuario registrado correctamente.' );
                navigate( 'LoginScreen' );
            })
            .catch( error => {
                console.log( error );
                Alert.alert( error.message );
            })
    }

    const saveValidUser = async ( userCredential ) => {

        const loginImg = '../../../assets/images/user.png'

        await setDoc(doc( db, 'users', userCredential.user.uid ), {
            username:       username,
            description:    description,
            photo:          loginImg,
        })
    } //END SAVE_VALID_USER()

    const onGoLoginPressed = () => {
        navigate('LoginScreen');
    } //END ON_PRESS_GO_LOGIN()


    return (
        <SafeAreaView style = { styles.screenContainer} >
            <TopBar
                topText     = 'REGISTRO'
            />

            {/* MAIN CONTAINER */}
            <View style = { styles.mainContainer} >

                {/* TITLE & SUB-TITLE */}
                <View style={{ marginVertical: 15, marginLeft: -50 }}>
                    <Text style={{ color: 'rgb(53, 96, 106)', fontSize: 35, 
                    fontWeight: 'bold', alignSelf: 'flex-start' }}>
                        REGISTRO
                    </Text>
                    <Text style={{ color: 'lightgrey', fontSize: 12, alignSelf: 'flex-start' }}>
                        Crea tu cuenta y empieza a registrar tus retos.
                    </Text>
                </View>
                {/* END TITLE & SUB-TITLE */}

                {/* SIGN IN FORM */}
                <View style={ styles.input }>

                    {/* INPUT USERNAME */}
                    <Input
                        placeholder='Nombre de usuario*'
                        containerStyle={{ marginTop: 10}}
                        inputStyle={{ fontSize: 13, color: 'white' }}
                        leftIcon={{ name: 'account-circle' }}
                        errorMessage={ input_error_username }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setUsername(value) }
                    />
                    {/* END INPUT USERNAME */}

                    {/* LOGIN INPUT USERNAME */}
                    <Input
                        placeholder='Email*'
                        containerStyle={{ marginTop: -10}}
                        inputStyle={{ fontSize: 13, color: 'white' }}
                        leftIcon={{ name: 'mail' }}
                        errorMessage={ input_error_email }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setEmail(value) }
                    />
                    {/* END LOGIN INPUT USERNAME */}

                    {/* LOGIN INPUT PASSWORD */}
                    <Input
                        placeholder='Contraseña*'
                        containerStyle={{ marginTop: -10 }}
                        inputStyle={{ fontSize: 13, color: 'white' }}
                        leftIcon={{ name: 'lock' }}
                        secureTextEntry
                        errorMessage={ input_error_password }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setPassword(value) }
                    />
                    {/* END LOGIN INPUT PASSWORD */}

                    {/* LOGIN INPUT REPEAT PASSWORD */}
                    <Input
                        placeholder='Repite contraseña*'
                        containerStyle={{ marginTop: -10 }}
                        inputStyle={{ fontSize: 13, color: 'white' }}
                        leftIcon={{ name: 'lock' }}
                        secureTextEntry
                        errorMessage={ input_error_repPassword }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setRepPassword(value) }
                    />
                    {/* END LOGIN INPUT REPEAT PASSWORD */}

                    {/* INPUT DESCRIPTION */}
                    <Input
                        placeholder='Describe tus proyectos'
                        containerStyle={{ marginTop: 0 }}
                        inputStyle={{ fontSize: 13, color: 'white', height: 100,
                        textAlignVertical:'top' }}
                        multiline={true}
                        maxLength={150}
                        secureTextEntry
                        errorMessage={ input_error_description }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setDescription(value) }
                    />
                    {/* END INPUT DESCRIPTION */}

                    {/* LOGIN BUTTON SIGN IN */}
                    <Button
                        title="Registrarse"
                        containerStyle={{ marginTop: 10 }}
                        buttonStyle={{ backgroundColor: '#337657' }}
                        onPress={ onSignUpPressed }
                    />
                    {/* END LOGIN BUTTON SIGN IN */}

                    {/* LOGIN BUTTON SIGN UP */}
                    <Button
                        title="Ya tengo una cuenta creada"
                        containerStyle={{ marginTop: 5 }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        titleStyle={{ color: 'white', fontFamily: 'normal', fontStyle: 'italic', fontSize: 12 }}
                        onPress={ onGoLoginPressed }
                    />
                    {/* END LOGIN BUTTON SIGN UP */}

                </View>
                {/* END SIGN IN FORM */}

            </View>
            {/* END MAIN CONTAINER */}

        </SafeAreaView>
    )

}

export default RegisterScreen;
