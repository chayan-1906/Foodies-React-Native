import {Image, Pressable, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles.tsx';
import {useSharedState} from '@features/tabs/SharedContext.tsx';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from '@components/global/Icon.tsx';
import {Colors} from '@unistyles/Constants.tsx';
import RollingContent from 'react-native-rolling-bar';
import CustomText from '@components/global/CustomText.tsx';

const searchItems: string[] = ['Search "Chai Samosa"', 'Search "Cake"', 'Search "Ice Cream"', 'Search "pizza"', 'Search "Biriyani"'];

function SearchBar() {
    const {styles} = useStyles(homeStyles);
    const {scrollYGlobal} = useSharedState();
    const isVegMode = true;

    const textColorAnimation = useAnimatedStyle(() => {
        const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);
        return {
            color: `rgb(${textColor},${textColor},${textColor})`,
        };
    });

    return (
        <>
            <SafeAreaView />
            <View style={[styles.flexRowBetween, styles.padding]}>
                <TouchableOpacity style={styles.searchInputContainer} activeOpacity={0.8}>
                    <Icon size={20} name={'search'} iconFamily={'Ionicons'} color={isVegMode ? Colors.active : Colors.primary} />

                    <RollingContent interval={3000} defaultStyle={false} customStyle={styles.textContainer} {...({} as any)}>
                        {searchItems.map((text, index) => {
                            return (
                                <CustomText key={index} fontSize={12} fontFamily={'Okra-Medium'} style={styles.rollingText}>
                                    {text}
                                </CustomText>
                            );
                        })}
                    </RollingContent>

                    <Icon size={20} name={'mic-outline'} iconFamily={'Ionicons'} color={isVegMode ? Colors.active : Colors.primary} />
                </TouchableOpacity>

                <Pressable style={styles.vegMode} onPress={() => {}}>
                    <Animated.Text style={[textColorAnimation, styles.animatedText]}>VEG</Animated.Text>
                    <Animated.Text style={[textColorAnimation, styles.animatedSubText]}>MODE</Animated.Text>

                    <Image source={isVegMode ? require('@assets/icons/switch_on.png') : require('@assets/icons/switch_off.png')} style={styles.switch} />
                </Pressable>
            </View>
        </>
    );
}

export default SearchBar;
