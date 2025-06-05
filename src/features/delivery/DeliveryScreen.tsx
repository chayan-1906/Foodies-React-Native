import {Animated, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles.tsx';
import {useSharedState} from '@features/tabs/SharedContext.tsx';
import {Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Graphics from '@components/home/Graphics.tsx';
import HeaderSection from '@components/home/HeaderSection.tsx';
import MainList from '@components/list/MainList.tsx';

function DeliveryScreen() {
    const insets = useSafeAreaInsets();
    const {styles} = useStyles(homeStyles);
    const {scrollYGlobal} = useSharedState();

    const backgroundColorChanges = useAnimatedStyle(() => {
        const opacity = interpolate(scrollYGlobal.value, [1, 50], [0, 1]);
        return {
            backgroundColor: `rgba(255,255,255,${opacity})`,
        };
    });

    const moveUpStyle = useAnimatedStyle(() => {
        const translateY = interpolate(scrollYGlobal.value, [0, 50], [0, -50], Extrapolate.CLAMP);
        return {
            transform: [{translateY}],
        };
    });

    const moveUpStyleNotExtrapolate = useAnimatedStyle(() => {
        const translateY = interpolate(scrollYGlobal.value, [0, 50], [0, -50]);
        return {
            transform: [{translateY}],
        };
    });

    return (
        <View style={styles.container}>
            <View style={{height: insets.top}}>
                <Animated.View style={moveUpStyle}>
                    <Animated.View style={moveUpStyleNotExtrapolate}>
                        <Graphics />
                    </Animated.View>

                    <Animated.View style={[backgroundColorChanges, styles.topHeader]}>
                        <HeaderSection />
                    </Animated.View>

                    <Animated.View style={moveUpStyle}>
                        <MainList />
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    );
}

export default DeliveryScreen;
