import React from 'react';
import { StyleSheet, View, Image, Dimensions,
        SafeAreaView, useWindowDimensions, Alert,
        TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../utils/Firebase.js';


import TopBar from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

const thisHeight = Dimensions.get("window").height * 1.057;

const styles = StyleSheet.create({
    screenContainer: {
        height: thisHeight,
    },
    mainContainer: {
        flex: 8
    },
    ImgContainer: {
        marginTop: 15,
        marginBottom: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 60,
        borderColor: 'gray',
    },
    imgProfile: {
        flex: 1,
        width: 120,
        maxHeight: 120,
        resizeMode: 'contain',
        backgroundColor: 'lightgray',
        borderRadius: 60,
    },
    input: {
        alignSelf: 'center',
        width: '90%',
        marginTop: -65,
        paddingTop: 60,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        backgroundColor: '#353535',
        zIndex: -1,
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

const SiteProfile = ( props) => {

    const { navigate } = props.navigation;

    const user          = getAuth().currentUser;
    const userUID       = user.uid.toString();
    const [ imageURI, setImageURI ] = React.useState('https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg');
    const [ userData, setUserData ] = React.useState('');

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


    React.useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {

        const docRef = doc( db, 'users', userUID );
        const docSnap = await getDoc( docRef );
        setUserData( docSnap.data() );

    }

    const onChangeImgPressed = () => {
        
        const options = {
            tittle: 'Selecciona una imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }

        // launchImageLibrary(options, response => {

        //     console.log('Response = '+ response);

        // })

    }

    const onChangePressed = () => {

    }

    return(
        <SafeAreaView style = { styles.screenContainer }>
            
            <TopBar
                topText     = {'PERFIL'}
                textBtn     = 'Home'
                onPress     = { () => navigate('HomeScreen') }
            />

            {/* MAIN CONTAINER */}
            <View style = { styles.mainContainer} >

                {/* IMAGE */}
                <TouchableOpacity 
                    style={ styles.ImgContainer }
                    onPress={ onChangeImgPressed }>
                    <Image
                        source={{uri: imageURI }}
                        style={ styles.imgProfile }
                    />
                </TouchableOpacity>

                {/* END IMAGE */}

                {/* SIGN IN FORM */}
                <View style={ styles.input }>

                    {/* INPUT USERNAME */}
                    <Input
                        placeholder='Nombre de usuario*'
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
                        containerStyle={{ marginTop: -15}}
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
                        containerStyle={{ marginTop: -15 }}
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
                        containerStyle={{ marginTop: -15 }}
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
                        containerStyle={{ marginTop: 0, marginBottom: -10 }}
                        inputStyle={{ fontSize: 13, color: 'white', height: 80,
                        textAlignVertical:'top' }}
                        multiline={true}
                        maxLength={150}
                        secureTextEntry
                        errorMessage={ input_error_description }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setDescription(value) }
                    />
                    {/* END INPUT DESCRIPTION */}

                </View>
                {/* END SIGN IN FORM */}

            </View>
            {/* END MAIN CONTAINER */}

            {/* NAVBAR */}
            <NavBar 
                BtnTittle   = 'GUARDAR CAMBIOS'
                navBarStyle = 'ONE-COL-BTN'
                navigate    = { navigate }
                onPress     = { onChangePressed }
            />
            <NavBar 
                BtnTittle   = 'BORRAR CUENTA'
                BtnBgColor  = '#A24857'
                navBarStyle = 'ONE-COL-BTN'
                navigate    = { navigate }
                onPress     = { () => navigate('HomeScreen') }
            />
            {/* END NAVBAR */}

        </SafeAreaView>
    )

}

export default SiteProfile;