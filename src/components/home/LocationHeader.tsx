import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';
import {Colors, Fonts} from '@/unistyles/Constants.tsx';
import Icon from '@/components/global/Icon.tsx';
import {homeStyles} from '@/unistyles/homeStyles.tsx';
import CustomText from '@/components/global/CustomText.tsx';
import {useSharedState} from '@/features/tabs/SharedContext.tsx';
import TranslationIcon from '../../../assets/icons/translation.png';

function LocationHeader() {
    const {scrollYGlobal} = useSharedState();
    const {styles} = useStyles(homeStyles);
    const textColor = '#FFF';

    const opacityFadingStyles = useAnimatedStyle(() => {
        const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
        return {
            opacity,
        };
    });

    return (
        <Animated.View style={opacityFadingStyles}>
            <SafeAreaView/>
            <View style={styles.flexRowBetween}>
                <View style={styles.flexRowGap}>
                    <Icon size={32} name={'map-marker'} iconFamily={'MaterialCommunityIcons'} color={textColor}/>
                    <View>
                        <TouchableOpacity style={styles.flexRow}>
                            <CustomText variant={'h5'} color={textColor} fontFamily={Fonts.Bold}>
                                Erangel, Pochinki
                            </CustomText>
                            <Icon size={18} name={'chevron-down'} iconFamily={'MaterialCommunityIcons'} color={textColor}/>
                        </TouchableOpacity>
                        <CustomText color={textColor} fontFamily={Fonts.Medium}>
                            Lucknow, Uttar Pradesh
                        </CustomText>
                    </View>
                </View>

                <View style={styles.flexRowGap}>
                    <TouchableOpacity style={styles.translation}>
                        <Image source={TranslationIcon} style={styles.translationIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.profileAvatar}>
                        {/*<Image source={UserImage} style={styles.profileImage} resizeMode={'cover'} />*/}
                        <Icon size={30} name={'account-circle'} iconFamily={'MaterialIcons'} color={Colors.background}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}

export default LocationHeader;
