import {useSharedState} from '@features/tabs/SharedContext.tsx';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {tabStyles} from '@unistyles/tabStyles.tsx';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Colors, screenWidth} from '@unistyles/Constants.tsx';
import {Animated, View} from 'react-native';
import ScalePress from '@components/ui/ScalePress.tsx';
import {DeliveryTabIcon, DiningTabIcon, LiveTabIcon, ReorderTabIcon} from '@features/tabs/TabIcon.tsx';
import screens from '@utils/screens.ts';

function CustomTabBar({state, navigation}: BottomTabBarProps) {
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

    console.log('state.routes', state.routes);

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
                </View>
            </Animated.View>
        </>
    );
}

export default CustomTabBar;
