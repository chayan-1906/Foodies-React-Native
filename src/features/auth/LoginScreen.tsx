import {ActivityIndicator, Animated, Image, Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {loginStyles} from '@unistyles/authStyles.tsx';
import screens from '@utils/screens.ts';
import CustomText from '@components/global/CustomText.tsx';
import BreakerText from '@components/ui/BreakerText.tsx';
import PhoneInput from '@components/ui/PhoneInput.tsx';
import {useCallback, useEffect, useRef, useState} from 'react';
import {resetAndNavigate} from '@utils/NavigationUtils.tsx';
import SocialLogin from '@components/ui/SocialLogin.tsx';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight.tsx';

function LoginScreen() {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const keyboardOffsetHeight = useKeyboardOffsetHeight();

    const {styles} = useStyles(loginStyles);
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = useCallback(() => {
        setIsLoading(true);
        setTimeout(async () => {
            await resetAndNavigate(screens.userBottomTab);
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (keyboardOffsetHeight === 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.25,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [keyboardOffsetHeight]);

    return (
        <View style={styles.container}>
            <StatusBar hidden={Platform.OS !== 'android'} />
            <Image source={require('@assets/images/login.png')} style={styles.cover} />

            <Animated.ScrollView bounces={false} keyboardShouldPersistTaps={'handled'} keyboardDismissMode={'on-drag'} contentContainerStyle={styles.bottomContainer} style={{transform: [{translateY: animatedValue}]}}>
                <CustomText fontFamily={'Okra-Bold'} variant={'h2'} style={styles.title}>
                    India's #1 Food Delivery and Dining App
                </CustomText>

                <BreakerText text={'Log in or Sign Up'} />

                <PhoneInput value={phone} onChangeText={setPhone} />

                <TouchableOpacity style={styles.buttonContainer} disabled={isLoading} onPress={handleLogin} activeOpacity={0.8}>
                    {isLoading ? (
                        <ActivityIndicator size={'small'} color={'#FFF'} />
                    ) : (
                        <CustomText color={'#FFF'} fontFamily={'Okra-Medium'} variant={'h5'}>
                            Continue
                        </CustomText>
                    )}
                </TouchableOpacity>

                <BreakerText text={'or'} />

                <SocialLogin />
            </Animated.ScrollView>

            <View style={styles.footer}>
                <CustomText>By continuing, you agree to our</CustomText>
                <View style={styles.footerTextContainer}>
                    <CustomText style={styles.footerText}>Terms of Service</CustomText>
                    <CustomText style={styles.footerText}>Privacy Policy</CustomText>
                    <CustomText style={styles.footerText}>Content Policies</CustomText>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;
