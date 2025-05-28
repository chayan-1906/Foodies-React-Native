import {Image, Platform, StatusBar, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';
import {splashStyles} from '@unistyles/authStyles.tsx';
import CustomText from '@components/global/CustomText.tsx';
import {useEffect} from 'react';
import {resetAndNavigate} from '@utils/NavigationUtils.tsx';
import screens from '@utils/screens.ts';

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
            <StatusBar hidden={Platform.OS !== 'android'} />
            <Image source={require('@assets/images/logo_t.png')} style={styles.logoImage} />
            <Animated.View style={styles.animatedContainer} entering={FadeInDown.delay(400).duration(800)}>
                <Image source={require('@assets/images/tree.png')} style={styles.treeImage} />
                <CustomText variant={'h5'} style={styles.msgText} fontFamily={'Okra-Medium'} color={'#FFF'}>
                    From Kitchen to doorstep. Your cravings, delivered!
                </CustomText>
            </Animated.View>
        </View>
    );
}

export default SplashScreen;
