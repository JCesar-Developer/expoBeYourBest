import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TopBar from '../widgets/TopBar.js'
import { NavBar } from '../widgets/NavBar.js';
import * as Notifications from 'expo-notifications';

//Configuración general de la app con respecto a las notificaciones
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1   
    },
    mainContainer: {
        flex: 1.5
    }
});

const SiteContact = ( props ) => {

    const { navigate }  = props.navigation;
    const navBarStyle   = 'COMPLETE_NAVBAR';

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);
    
      async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }

      const sendMessage = (token) => {
        fetch('https://exp.hot/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, dflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: token,
                title: 'Manuel',
                body: 'Tienes un nuevo mensaje',
                data: { data: 'data goes here'},
                _displayInForeground: true,
            }),
        });
      }

    return(
        <View style = { styles.screenContainer }>
            <TopBar
                topText     = 'CONTACTO'
                topButton   = { true }
                textBtn     = 'Home'
                onPress = { () => navigate('HomeScreen') }
            >
            </TopBar>
            <Text style = { styles.mainContainer }>SiteContact</Text>
            <Button title="send me a message" onPress={() => sendMessage(expoPushToken)}/>
            <NavBar 
                navigate = { navigate }
                navBarStyle = { navBarStyle }>
            </NavBar>
        </View>
    )

}

export default SiteContact;