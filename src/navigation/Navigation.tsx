import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen.tsx';
import LoginScreen from '@features/auth/LoginScreen.tsx';
import screens from '@utils/screens.ts';
import {navigationRef} from '@utils/NavigationUtils.ts';
import AnimatedTabs from '@features/tabs/AnimatedTabs.tsx';
import RestaurantScreen from '@features/restaurants/RestaurantScreen.tsx';

const Stack = createNativeStackNavigator();

function Navigation() {
    console.log('Navigation');

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={screens.splashScreen} screenOptions={{headerShown: false}}>
                <Stack.Screen name={screens.splashScreen} component={SplashScreen} />
                <Stack.Screen name={screens.restaurantDetailsScreen} component={RestaurantScreen} />
                <Stack.Screen name={screens.loginScreen} component={LoginScreen} options={{animation: 'fade'}} />
                <Stack.Screen name={screens.userBottomTab} component={AnimatedTabs} options={{animation: 'fade'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
