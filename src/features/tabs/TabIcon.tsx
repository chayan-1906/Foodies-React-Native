import {memo} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Image, TextStyle, View, ViewStyle} from 'react-native';
import {Colors} from '@unistyles/Constants.tsx';
import {TabIconProps} from '../../types';
import CustomText from '@components/global/CustomText.tsx';
import Delivery from '@assets/tabicons/delivery.png';
import Dining from '@assets/tabicons/dining.png';

const styles = {
    width: RFValue(18),
    height: RFValue(18),
};

const tabStyles: ViewStyle = {
    justifyContent: 'center',
    alignContent: 'center',
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
    return (
        <View style={tabStyles}>
            <Image source={name === 'Delivery' ? Delivery : name === 'Dining' ? Dining : name === 'Reorder' ? 'Reorder' : 'Live'} style={styles} />
            <CustomText style={testStyleActive}>{name}</CustomText>
        </View>
    );
});

const TabIconFocused = memo(({name}: {name: string}) => {
    const isVegMode = true;

    return (
        <View style={tabStyles}>
            <Image
                source={name === 'Delivery' ? Delivery : name === 'Dining' ? Dining : name === 'Reorder' ? 'Reorder' : 'Live'}
                style={[
                    styles,
                    {
                        tintColor: name === 'Live' ? undefined : isVegMode ? Colors.active : Colors.primary,
                    },
                ]}
            />
            <CustomText style={testStyleActive}>{name}</CustomText>
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
