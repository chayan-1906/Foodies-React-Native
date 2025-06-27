import {useEffect} from "react";
import '@/unistyles/unistyles';
import {useFonts} from "expo-font";
import {Provider} from 'react-redux';
import * as ExpoSplashScreen from 'expo-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from "@/states/store";
import Navigation from "@/navigation/Navigation";

// ExpoSplashScreen.preventAutoHideAsync();

function App() {
    console.log('App loaded');

    const [fontsLoaded] = useFonts({
        'Okra-Regular': require('./assets/fonts/Okra-Regular.ttf'),
        'Okra-Medium': require('./assets/fonts/Okra-Medium.ttf'),
        'Okra-MediumLight': require('./assets/fonts/Okra-MediumLight.ttf'),
        'Okra-Bold': require('./assets/fonts/Okra-Bold.ttf'),
        'Okra-ExtraBold': require('./assets/fonts/Okra-ExtraBold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            ExpoSplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation/>
            </PersistGate>
        </Provider>
    );
}

export default App;
