import {Image, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {ITabBarProps} from '@/types';
import screens from '@/utils/screens.ts';
import {tabStyles} from '@/unistyles/tabStyles.tsx';
import CartHOC from '@/features/checkout/CartHOC.tsx';
import ScalePress from '@/components/ui/ScalePress.tsx';
import {Colors} from '@/unistyles/Constants.tsx';
import {useSharedState} from '@/features/tabs/SharedContext.tsx';
import {DeliveryTabIcon, DiningTabIcon, LiveTabIcon, ReorderTabIcon} from '@/features/tabs/TabIcon.tsx';
import GroceryImage from '@/assets/icons/grocery.png';

function CustomTabBar({state, descriptors, navigation}: ITabBarProps) {
    const {scrollY} = useSharedState();
    const bottom = useSafeAreaInsets();

    const {styles} = useStyles(tabStyles);
    const isLiveTabFocused = state.routes[state.index].name === screens.liveScreen;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: scrollY.value === 1 ? withTiming(100, {duration: 300}) : withTiming(0, {duration: 300}),
                },
            ],
        };
    });

    return (
        <>
            {!isLiveTabFocused && <CartHOC />}
            <Animated.View style={[styles.tabBarContainer, animatedStyle, {paddingBottom: bottom.bottom, backgroundColor: isLiveTabFocused ? Colors.dark : Colors.background}]}>
                <View style={styles.tabContainer}>
                    {state.routes.map((route: any, index: number) => {
                        console.log('route:', route);
                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <ScalePress key={index} onPress={onPress} onLongPress={onLongPress} style={[styles.tabItem, isFocused ? styles.focusedTabItem : {}]}>
                                {route.name === screens.deliveryScreen && <DeliveryTabIcon focused={isFocused} />}
                                {route.name === screens.reorderScreen && <ReorderTabIcon focused={isFocused} />}
                                {route.name === screens.diningScreen && <DiningTabIcon focused={isFocused} />}
                                {route.name === screens.liveScreen && <LiveTabIcon focused={isFocused} />}
                            </ScalePress>
                        );
                    })}
                    <View style={styles.verticalLine} />
                </View>

                <View style={styles.groceryLogoContainer}>
                    <Image source={GroceryImage} style={styles.groceryLogo} />
                </View>
            </Animated.View>
        </>
    );
}

export default CustomTabBar;
