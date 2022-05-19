import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//SCREENS
import HomeScreen from './app/screens/HomeScreen'
import LoginScreen from './app/screens/LoginScreen'
import SiteContact from './app/screens/SiteContact';
import SiteEvolution from './app/screens/SiteEvolution';
import SiteNewChallenge from './app/screens/SiteNewChallenge';
import SiteNewCategory from './app/screens/SiteNewCategory';
import SiteChallengeDetails from './app/screens/SiteChallengeDetails';
import SiteProfile from './app/screens/SiteProfile';
import SiteAchievements from './app/screens/SiteAchievements';

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

/**
 * PENDIENTES:
 * - Terminar de implementar el categorias.
 * - 
 */