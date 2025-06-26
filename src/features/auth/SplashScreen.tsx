import {useEffect} from 'react';
import {Image, StatusBar, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';
import screens from '@/utils/screens.ts';
import {Fonts} from '@/unistyles/Constants.tsx';
import {splashStyles} from '@/unistyles/authStyles.tsx';
import CustomText from '@/components/global/CustomText.tsx';
import {resetAndNavigate} from '@/utils/NavigationUtils.ts';
import LogoTImage from '@/assets/images/logo_t.png';
import TreeImage from '@/assets/images/tree.png';

function SplashScreen() {
    const {styles} = useStyles(splashStyles);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            await resetAndNavigate(screens.loginScreen);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Image source={LogoTImage} style={styles.logoImage} />
            <Animated.View style={styles.animatedContainer} entering={FadeInDown.delay(400).duration(800)}>
                <Image source={TreeImage} style={styles.treeImage} />
                <CustomText variant={'h5'} style={styles.msgText} fontFamily={Fonts.Medium} color={'#FFF'}>
                    From Kitchen to doorstep. Your cravings, delivered!
                </CustomText>
            </Animated.View>
        </View>
    );
}

export default SplashScreen;
