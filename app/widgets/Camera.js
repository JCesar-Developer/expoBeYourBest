import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, 
        SafeAreaView, ImageBackground, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Icon } from "@rneui/themed";

import TopBar from '../widgets/TopBar.js'

const CameraScreen = ( props ) => {

    let cameraRef = useRef();
    const { navigate } = props.navigation;

    const [ hasPermission, setHasPermission ] = useState(null);
    const [ photo, setPhoto ] = useState();
    const [ type, setType ] = useState(CameraType.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    //FUNCTIONS
    const onCancelPressed = () => {
        navigate('SiteProfile');
    }; //END ON_CANCEL_PRESSED();

    const hadleTakePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };
    
        let newPhoto = await cameraRef.current.takePictureAsync( options );
        setPhoto( newPhoto );
    }; //END HANDLE_TAKE_PICTURE();

    if( photo ) {

        return (
            <SafeAreaView style={styles.screenContainer}>                

                {/* TOPBAR */}
                <TopBar 
                    topText = {'¿TE GUSTA?'}
                />
                {/* END TOPBAR */}

                <ImageBackground style={{ alignSelf: 'stretch', flex: 1 }} 
                source={{ uri: "data:image/jpg;base64," + photo.base64 }}>

                    <View style={ styles.buttonsContainer }>

                        {/* CANCEL BUTTON */}
                        <TouchableOpacity
                            onPress={ () => setPhoto(undefined) }>
                            <Icon
                                name='highlight-off'
                                color='red' 
                                size={60}
                                containerStyle={{ 
                                    marginHorizontal: 20, 
                                    backgroundColor: 'gray',
                                    borderRadius: 30
                                }}
                            />
                        </TouchableOpacity>
                        {/* END CANCEL BUTTON */}

                        {/* SEND PICTURE BUTTON */}
                        <TouchableOpacity
                            onPress={ () => {
                                navigate( 'SiteProfile', photo );
                            }}>
                            <Icon
                                name='check-circle-outline'
                                color='darkgreen' 
                                size={60}
                                containerStyle={{ 
                                    marginHorizontal: 20, 
                                    backgroundColor: 'white',
                                    borderRadius: 30
                                }}
                            />
                        </TouchableOpacity>
                        {/* END SEND PICTURE BUTTON */}
                    </View>

                </ImageBackground>

            </SafeAreaView>
        );
    };

    const hadleFlipCamera = () => {
        setType( type === CameraType.back ? CameraType.front : CameraType.back );
    };


    //RENDER
    if ( hasPermission === null ) {
        return <View style={ styles.screenContainer } />;
    }
    if ( hasPermission === false ) {
        return (
            <View style={ styles.screenContainer } > 
                <Text>No access to camera</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={ styles.screenContainer }>

            {/* TOPBAR */}
            <TopBar
                topText = {'HAS UNA FOTO DE PERFIL'}
            />
            {/* END TOPBAR */}

            <Camera style={{ alignSelf: 'stretch', flex: 1 }} 
            type={ type } ref={ cameraRef }>
                <View style={ styles.buttonsContainer }>

                    {/* CANCEL BUTTON */}
                    <TouchableOpacity
                        onPress={ onCancelPressed }>
                        <Icon
                            name='highlight-off'
                            color='white' 
                            size={35}
                            containerStyle={{ marginRight: '5%' }}
                        />
                    </TouchableOpacity>
                    {/* END CANCEL BUTTON */}

                    {/* TAKE A PICTURE BUTTON */}
                    <TouchableOpacity
                        onPress={ hadleTakePicture }>
                        <Icon
                            name='circle'
                            color='lightgray' 
                            size={70}
                            containerStyle={{margin: 5, backgroundColor: 'white', 
                                            borderRadius: 50}}
                        />
                    </TouchableOpacity>
                    {/* END TAKE A PICTURE BUTTON */}

                    {/* FLIP BUTTON */}
                    <TouchableOpacity
                        onPress={ hadleFlipCamera }>
                        <Icon
                            name='autorenew'
                            color='white' 
                            size={35}
                            containerStyle={{ marginLeft: '5%' }}
                        />
                    </TouchableOpacity>
                    {/* END FLIP BUTTON */}

                </View>
                <Text style={ styles.bottomText }>Toma una foto de perfil</Text>
            </Camera>
        </SafeAreaView>
    );

}

export default CameraScreen;

const styles = StyleSheet.create({ 
    screenContainer: {
        flex: 1,
        // backgroundColor: '#fff',
        // justifyContent: 'center',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '140%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    bottomText: {
        marginBottom: 10,
        color: 'white',
        alignSelf: 'center',
    },
    icon: {
        color: 'white',
    },
}); 