import React, { useState } from 'react';
import { StyleSheet, Text, Picker, View, FlatList, 
        TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import icons from '../models/Icons';

import TopBar from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js'

const thisHeight = Dimensions.get("window").height * 1.057;

const styles = StyleSheet.create({
    screenContainer: {
        // flex: 1,  
        height: thisHeight,
    },
    mainContainer: {
        flex: 8
    },
    inputGroup: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    iconFlatList: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 2,
        paddingVertical: 5,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
    },
    iconContainer: {
        margin: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    navBarContainer: {
        flex: 1
    },
    picker: {
        padding: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'end',
    }
});

const SiteNewCategory = ( props ) => {
    
    // ------------------------------ ATRIBUTES ----------------------------- //

    const { navigate }  = props.navigation;
    const navBarStyle   = 'ONE-COL-BTN'
    const iconDefaultColor = '#517fa4'  
    const colorsArray = [
        {id: 0, color: 'default', hexCode: ''},
        {id: 1, color: 'rojo', hexCode: ''},
        {id: 2, color: 'azul', hexCode: ''},
        {id: 3, color: 'amarillo', hexCode: ''},
        {id: 4, color: 'naranja', hexCode: ''},
        {id: 5, color: 'verde', hexCode: ''},
        {id: 6, color: 'morado', hexCode: ''},
    ];

    // -------------------------- STATES MANAGMENT -------------------------- //

    const [selectedValue, setSelectedValue] = useState("java");
    const [error_input_name, setErrorName] = useState('');
    const [error_input_description, setErrorDescription] = useState('');
    const [error_input_icon, setErrorIcon] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(icons);
    const [inputState, setInputState] = useState({
        name: '',
        description: '',
        icon: '',
        color: iconDefaultColor,
    });
    
    const handleChangeText = ( input, value ) => {
        setInputState({ ...inputState, [input]: value })    
    }; //END HANDLE_CHANGE_TEXT

    const handleIconSelected = ( item ) => {

        if( selectedIndex.indexOf( item ) > -1 ){

            let newArray = selectedIndex.filter( ( indexObject ) => {
                if( indexObject == item ){
                    indexObject.color = 'black';
                } else {
                    indexObject.color=iconDefaultColor;
                }

                setInputState({ ...inputState, icon: item });
                return true;
            });

            setSelectedIndex(newArray);
            
        } else{
            setSelectedIndex([ ...selectedIndex ]);
        }
     
    }; //END HANDLE_ICON_SELECTED


    const saveNewCategory = () => {
        if(inputState.name === '' ){
            setErrorName( 'Este campo es necesario.' );
        } 
        if(inputState.description === ''){
            setErrorDescription( 'Coloque una pequeña descripción' ); 
        } 
        if(inputState.description === ''){
            setErrorIcon( 'Por favor, escoja un ícono.' ); 
        } 
        else {
            // const docRef = await addDoc(collection(firebase.db, "challengeCategory"), {
            //     name: inputState.name,
            //     description: inputState.description,
            // })
            // console.log("Document written with ID: ", docRef.id);
            // navigate('SiteEvolution');
            console.log("Resultado inputState: \n", inputState);
            
        }

    }    

    // ------------------------------- SCREEN ------------------------------- //

    return(
        <View style = { styles.screenContainer }>
            <TopBar
                topText     = 'NUEVA CATEGORÍA'
                topButton   = { true }
                textBtn     = 'Volver atras'
                onPress     = { () => navigate('SiteEvolution') }
            />

            {/* MAIN SCREEN */}  
            <View style = { styles.mainContainer }>

                {/* INPUT CATEGORY NAME */}
                <View style={styles.inputGroup}>
                    <Input label="Nombre" 
                        placeholder='Escoge un nombre para tu categoría'
                        inputStyle={{ fontSize: 15 }}
                        errorMessage={ error_input_name }
                        onChangeText={(value) => handleChangeText('name', value)}
                        leftIcon={ 
                            <Icon 
                                name='bookmarks'
                                type='material'
                                size={24}
                                color='gray'
                            />
                        }
                    /> 
                </View> 
                {/* END INPUT CATEGORY NAME */}

                {/* INPUT CATEGORY DESCRIPTION */}
                <View style={styles.inputGroup}>
                    <Input label="Descripción"
                        placeholder='Describe tu categoría en unas pocas palabras.'
                        inputStyle={{ fontSize: 15 }}
                        errorMessage={ error_input_description }
                        onChangeText={(value) => handleChangeText('description', value)}
                    /> 
                </View> 
                {/* END INPUT CATEGORY DESCRIPTION */}

                {/* PICKER SELECT_COLOR */}
                <View style={ styles.picker }>

                    <Text style={{ color: 'rgb(134, 147, 158)', fontSize: 16, 
                    fontWeight: 'bold'}}>Color:   </Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 35, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        {colorsArray.map(item => (
                            <Picker.Item key={item.id} label={item.color} value={item.color} />
                        ))}    
                    </Picker>

                </View>
                {/* END PICKER SELECT_COLOR */}


                {/* FLATLIST: CATEGORY ICONS */}
                <FlatList
                    style={styles.iconFlatList}
                    numColumns={ 3 }
                    data={ selectedIndex }
                    extraData={ selectedIndex }
                    renderItem = {( { item } ) => 
                        <TouchableOpacity style={{width: '32.5%'}} 
                        onPress = {()=> handleIconSelected(item)}>
                            <Icon 
                                style   = { styles.iconContainer }
                                name    = { item.renderCode } 
                                color   = { item.color }
                                type    = 'material' 
                                size    = { 82 }
                            />
                        </TouchableOpacity>
                    }
                >
                </FlatList>
                {/* END FLATLIST: CATEGORY ICONS*/}

              {/* ERROR_MSG: IF ICON ISN'T SELECTED */}
              <Input 
                    disabled
                    containerStyle={{height: 20, marginBottom: 15}}
                    inputContainerStyle={{height: 0}} 
                    errorMessage={ error_input_icon } /> 
                {/* END ERROR_MSG: IF ICON ISN'T SELECTED */}

            </View>
            {/* END MAIN SCREEN */}

            {/* NAVBAR */}
            <NavBar 
                BtnTittle   = 'GUARDAR'
                navBarStyle = { navBarStyle }
                navigate    = { navigate }
                onPress     = { saveNewCategory }
            />
            <NavBar 
                BtnTittle   = 'CANCELAR'
                BtnBgColor  = '#A24857'
                navBarStyle = { navBarStyle }
                navigate    = { navigate }
                onPress     = { () => navigate('SiteEvolution') }
            />
            {/* END NAVBAR */}
            
            
        </View>

    )

    // ----------------------------- END SCREEN ----------------------------- //

}

// ------------------------------------------------------------------------------------ //
// ---------------------------------- OTHER FUNTIONS ---------------------------------- //
// ------------------------------------------------------------------------------------ //

export default SiteNewCategory;