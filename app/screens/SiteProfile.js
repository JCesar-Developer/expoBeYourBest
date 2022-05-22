import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, Text,
        SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Input } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../utils/Firebase.js';


import TopBar from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

const thisHeight = Dimensions.get("window").height * 1.057;

const SiteProfile = ( props ) => {

    const { navigate } = props.navigation;

    const user          = getAuth().currentUser;
    const userUID       = user.uid.toString();
    const [ imageURI, setImageURI ] = useState(null);
    const [ userData, setUserData ] = useState('');

    //INPUT USER FORM
    const [ username, setUsername] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repPassword, setRepPassword ] = useState('');
    const [ description, setDescription ] = useState('');

    //ERROR MESSAGES INPUT USER FORM
    const [ input_error_username, setErrorUsername ] = useState('');
    const [ input_error_email, setErrorEmail ] = useState('');
    const [ input_error_password, setErrorPassword ] = useState('');
    const [ input_error_repPassword, setErrorRepPassword ] = useState('');
    const [ input_error_description, setErrorDescription ] = useState('');


    useEffect(() => {
        getUserData();

        //SET USER:
        setUsername(userData.username);
        setEmail(user.email);
        setDescription(userData.description);
        //END SET USER

        if ( props.route.params ) {
            setImageURI( "data:image/jpg;base64," + props.route.params.base64 );
        } else {
            setImageURI( 'https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg' )
        }

    }, [ props.route.params ]);

    const getUserData = async () => {

        const docRef = doc( db, 'users', userUID );
        const docSnap = await getDoc( docRef );
        setUserData( docSnap.data() );

    }

    const renderContentChangeImg = () => (
        <View style={ styles.panel }>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Actualizar foto</Text>
                <Text style={styles.panelSubtitle}>Escoge tu imagen de perfil</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={ takePhotoFromCamera }> 
                <Text style={styles.panelButtonTitle}>Tomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={ choosePhotoFromLibrary }>
                <Text style={styles.panelButtonTitle}>Escoger de la galería</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    ); //END RENDER_CONTENT_CHANGE_IMG

    const takePhotoFromCamera = () => {
        
        navigate('CameraScreen');
        bs.current.snapTo(1);

    };


    const choosePhotoFromLibrary = async () => {

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
    
        bs.current.snapTo(1);
        
        if (!result.cancelled) {
            setImageURI(result.uri);
        }

    }; //END USE_IMG_PICKER();

    const onChangePressed = async () => {

        await setDoc(doc( db, 'users', userUID ), {
            photo: imageURI,
            username: username,
            description: description,
        });
        
        console.log( userUID );
        console.log( imageURI );
        console.log( username );
        console.log( email );
        console.log( description );

        Alert.alert('Cambios guardados con éxito');

    }

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    return(
        <Animated.View style = { styles.screenContainer }>
            
            {/* TOPBAR */}
            <TopBar
                topText     = {'PERFIL'}
                textBtn     = 'Home'
                onPress     = { () => navigate('HomeScreen') }
            />
            {/* END TOPBAR */}

            {/* MAIN CONTAINER */}
            <View style = { styles.mainContainer} >

                {/* IMAGE */}
                <TouchableOpacity 
                    style={ styles.ImgContainer }
                    onPress={ () => bs.current.snapTo(0) }>
                        <Image
                            source={{ uri: imageURI }}
                            style={ styles.imgProfile }
                        />
                </TouchableOpacity>
                {/* END IMAGE */}


                {/* SIGN IN FORM */}
                <View style={ styles.input }>

                    {/* INPUT USERNAME */}
                    <Input
                        placeholder= { userData.username }
                        inputStyle={{ fontSize: 15, color: 'white' }}
                        leftIcon={{ name: 'account-circle' }}
                        errorMessage={ input_error_username }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setUsername(value) }
                    />
                    {/* END INPUT USERNAME */}

                    {/* LOGIN INPUT USERNAME */}
                    <Input
                        placeholder= { user.email }
                        containerStyle={{ marginTop: -15}}
                        inputStyle={{ fontSize: 15, color: 'white' }}
                        leftIcon={{ name: 'mail' }}
                        errorMessage={ input_error_email }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setEmail(value) }
                    />
                    {/* END LOGIN INPUT USERNAME */}

                    <Input
                        placeholder='Contraseña* (No funcional)'
                        containerStyle={{ marginTop: -15 }}
                        inputStyle={{ fontSize: 15, color: 'white' }}
                        leftIcon={{ name: 'lock' }}
                        secureTextEntry
                        errorMessage={ input_error_password }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setPassword(value) }
                    />

                    <Input
                        placeholder='Repite contraseña* (No funcional)'
                        containerStyle={{ marginTop: -15 }}
                        inputStyle={{ fontSize: 15, color: 'white' }}
                        leftIcon={{ name: 'lock' }}
                        secureTextEntry
                        errorMessage={ input_error_repPassword }
                        errorStyle={ styles.errorStyle }
                        onChangeText={ (value) => setRepPassword(value) }
                    />

                    {/* INPUT DESCRIPTION */}
                    <Input
                        placeholder={ userData.description }
                        containerStyle={{ marginTop: 0, marginBottom: -10 }}
                        inputStyle={{ fontSize: 15, color: 'white', height: 80,
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

            <BottomSheet
                ref={ bs }
                snapPoints={['45%', '0%', '0%']}
                renderContent={ renderContentChangeImg }
                initialSnap={1}
                callbackNode={ fall }
                enabledGestureInteraction={ true }
            />

        </Animated.View>
    )

}

export default SiteProfile;

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
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
      }
});