import {memo} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Image, TextStyle, View, ViewStyle} from 'react-native';
import {Colors} from '@unistyles/Constants.tsx';
import {TabIconProps} from '../../types';
import CustomText from '@components/global/CustomText.tsx';
import Delivery from '@assets/tabicons/delivery.png';
import DeliveryFocused from '@assets/tabicons/delivery_focused.png';
import Dining from '@assets/tabicons/dining.png';
import DiningFocused from '@assets/tabicons/dining_focused.png';
import Reorder from '@assets/tabicons/reorder.png';
import ReorderFocused from '@assets/tabicons/reorder_focused.png';
import Live from '@assets/tabicons/live.png';
import LiveFocused from '@assets/tabicons/live_focused.png';
import screens from '@utils/screens.ts';
import {useAppSelector} from '@states/reduxHook.ts';

const styles = {
    width: RFValue(20),
    height: RFValue(20),
};

const tabStyles: ViewStyle = {
    alignItems: 'center',
};

const testStyleInactive: TextStyle = {
    textAlign: 'center',
    marginTop: 4,
    color: Colors.lightText,
    fontSize: RFValue(9.5),
};

const testStyleActive: TextStyle = {
    textAlign: 'center',
    marginTop: 4,
    color: Colors.active,
    fontSize: RFValue(9.5),
};

const TabIcon = memo(({name}: {name: string}) => {
    let image;
    switch (name) {
        case screens.deliveryScreen.replaceAll('Screen', ''):
            image = Delivery;
            break;
        case screens.reorderScreen.replaceAll('Screen', ''):
            image = Reorder;
            break;
        case screens.diningScreen.replaceAll('Screen', ''):
            image = Dining;
            break;
        case screens.liveScreen.replaceAll('Screen', ''):
            image = Live;
            break;
    }

    return (
        <View style={tabStyles}>
            <Image source={image} style={styles} />
            <CustomText style={testStyleActive}>{name}</CustomText>
        </View>
    );
});

const TabIconFocused = memo(({name}: {name: string}) => {
    const isVegMode = useAppSelector(state => state.user.isVegMode);
    let image;
    switch (name) {
        case screens.deliveryScreen.replaceAll('Screen', ''):
            image = DeliveryFocused;
            break;
        case screens.reorderScreen.replaceAll('Screen', ''):
            image = ReorderFocused;
            break;
        case screens.diningScreen.replaceAll('Screen', ''):
            image = DiningFocused;
            break;
        case screens.liveScreen.replaceAll('Screen', ''):
            image = LiveFocused;
            break;
    }

    return (
        <View style={tabStyles}>
            <Image
                source={image}
                style={[
                    styles,
                    {
                        tintColor: name === screens.liveScreen.replaceAll('Screen', '') ? undefined : isVegMode ? Colors.active : Colors.primary,
                    },
                ]}
            />
            <CustomText style={[testStyleActive, {color: name === screens.liveScreen.replaceAll('Screen', '') ? 'white' : isVegMode ? Colors.active : Colors.primary}]}>{name}</CustomText>
        </View>
    );
});

export const DeliveryTabIcon = ({focused}: TabIconProps) => {
    return focused ? <TabIconFocused name={'Delivery'} /> : <TabIcon name={'Delivery'} />;
};

export const ReorderTabIcon = ({focused}: TabIconProps) => {
    return focused ? <TabIconFocused name={'Reorder'} /> : <TabIcon name={'Reorder'} />;
};

export const DiningTabIcon = ({focused}: TabIconProps) => {
    return focused ? <TabIconFocused name={'Dining'} /> : <TabIcon name={'Dining'} />;
};

export const LiveTabIcon = ({focused}: TabIconProps) => {
    return focused ? <TabIconFocused name={'Live'} /> : <TabIcon name={'Live'} />;
};
