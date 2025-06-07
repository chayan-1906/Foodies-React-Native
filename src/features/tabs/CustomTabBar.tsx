import {Image, View} from 'react-native';
import screens from '@utils/screens.ts';
import {tabStyles} from '@unistyles/tabStyles.tsx';
import {Colors, screenWidth} from '@unistyles/Constants.tsx';
import {useStyles} from 'react-native-unistyles';
import ScalePress from '@components/ui/ScalePress.tsx';
import {useSharedState} from '@features/tabs/SharedContext.tsx';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {DeliveryTabIcon, DiningTabIcon, LiveTabIcon, ReorderTabIcon} from '@features/tabs/TabIcon.tsx';
import {useAppSelector} from '@states/reduxHook.ts';

function CustomTabBar({state, navigation}: BottomTabBarProps) {
    const isVegMode = useAppSelector(state => state.user.isVegMode);
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

    const indicatorStyle = useAnimatedStyle(() => {
        const baseLeft = 10;
        const slideValue = state.index === 3 ? 0.23 : 0.24;

        return {
            left: withTiming(baseLeft + state.index * screenWidth * slideValue),
        };
    });

    return (
        <>
            <Animated.View
                style={[
                    styles.tabBarContainer,
                    animatedStyle,
                    {
                        paddingBottom: bottom.bottom,
                        backgroundColor: isLiveTabFocused ? Colors.dark : Colors.background,
                    },
                ]}
            >
                <View style={styles.tabContainer}>
                    {state.routes.map((route, index) => {
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

                {/*<Animated.View
                    style={[
                        styles.slidingIndicator,
                        indicatorStyle,
                        {
                            backgroundColor: isLiveTabFocused ? '#FFF' : isVegMode ? Colors.active : Colors.primary,
                        },
                    ]}
                />*/}

                <View style={styles.groceryLogoContainer}>
                    <Image source={require('@assets/icons/grocery.png')} style={styles.groceryLogo} />
                </View>
            </Animated.View>
        </>
    );
}

export default CustomTabBar;
