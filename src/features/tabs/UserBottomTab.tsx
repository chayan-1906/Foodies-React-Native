import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screens from '@/utils/screens.ts';
import DeliveryScreen from '@/features/delivery/DeliveryScreen.tsx';
import ReorderScreen from '@/features/reorder/ReorderScreen.tsx';
import DiningScreen from '@/features/dining/DiningScreen.tsx';
import LiveScreen from '@/features/live/LiveScreen.tsx';
import CustomTabBar from '@/features/tabs/CustomTabBar.tsx';

const Tab = createBottomTabNavigator();

function UserBottomTab() {
    console.log('UserBottomTab');

    return (
        <Tab.Navigator {...({} as any)} tabBar={props => <CustomTabBar {...props} />} screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
            <Tab.Screen name={screens.deliveryScreen} component={DeliveryScreen}/>
            <Tab.Screen name={screens.reorderScreen} component={ReorderScreen}/>
            <Tab.Screen name={screens.diningScreen} component={DiningScreen}/>
            <Tab.Screen name={screens.liveScreen} component={LiveScreen}/>
        </Tab.Navigator>
    );
}

export default UserBottomTab;
