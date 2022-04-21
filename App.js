import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from "./app/utils/firebase";

//SCREENS
import { HomeScreen } from './app/views/HomeScreen'
import { LoginScreen } from './app/views/LoginScreen'
import { SiteContact } from './app/views/SiteContact';
import { SiteEvolution } from './app/views/SiteEvolution';
import { SiteNewChallenge } from './app/views/SiteNewChallenge';
import { SiteNewCategory } from './app/views/SiteNewCategory';
import { SiteChallengeDetails } from './app/views/SiteChallengeDetails';
import { SiteProfile } from './app/views/SiteProfile';
import { SiteAchievements } from './app/views/SiteAchievements';

const Stack = createNativeStackNavigator();

// --- NAVIGATION CONTAINERS --- //
const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{ headerShown: false }}>

                <Stack.Screen name = "HomeScreen" component = { HomeScreen } />
                <Stack.Screen name = "LoginScreen" component = { LoginScreen } />

                <Stack.Screen name = "SiteContact" component = { SiteContact } />
                <Stack.Screen name = "SiteEvolution" component = { SiteEvolution } />
                <Stack.Screen name = "SiteNewChallenge" component = { SiteNewChallenge } />
                <Stack.Screen name = "SiteNewCategory" component = { SiteNewCategory } />
                <Stack.Screen name = "SiteChallengeDetails" component = { SiteChallengeDetails } />
                <Stack.Screen name = "SiteProfile" component = { SiteProfile } />
                <Stack.Screen name = "SiteAchievements" component = { SiteAchievements } />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

// ---------- APP.JS ---------- //
export default function App() {

    return (
        <MyStack />  
    );
    
}