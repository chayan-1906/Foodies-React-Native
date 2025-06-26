import {memo, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Platform, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useStyles} from 'react-native-unistyles';
import {SearchAndOffersProps} from '@/types';
import screens from '@/utils/screens.ts';
import {searchStyles} from '@/unistyles/restaurantStyles.tsx';
import {useAppSelector} from '@/states/reduxHook.ts';
import {selectRestaurantCart} from '@/states/reducers/cartSlice.ts';
import Icon from '@/components/global/Icon.tsx';
import {Colors} from '@/unistyles/Constants.tsx';
import CustomText from '@/components/global/CustomText.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {navigate} from '@/utils/NavigationUtils.ts';
import Confetti2Lottie from '@/assets/animations/confetti_2.json';

const searchItems: string[] = ['Search "chai samosa"', 'Search "Cake"', 'Search "icecream"', 'Search "pizza"', 'Search "Biriyani"'];

function SearchAndOffers({restaurant}: SearchAndOffersProps) {
    const {styles} = useStyles(searchStyles);
    const cart = useAppSelector(selectRestaurantCart(restaurant.id));

    const summary = useMemo(() => {
        return cart.reduce(
            (acc, item) => {
                acc.totalPrice += item.cartPrice || 0;
                acc.totalItems += item.quantity;
                return acc;
            },
            {totalPrice: 0, totalItems: 0},
        );
    }, [cart]);

    const slideAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const [showOffer, setShowOffer] = useState(summary.totalItems > 0);
    const [showConfetti, setShowConfetti] = useState(false);
    const hasShownCongrats = useRef(false);

    const translateY = slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    useEffect(() => {
        if (summary.totalItems > 0) {
            setShowOffer(true);
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnimation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => setShowOffer(false));
        }

        if (summary.totalPrice > 500 && !showConfetti && !hasShownCongrats.current) {
            setShowConfetti(true);
            hasShownCongrats.current = true;

            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnimation, {
                        toValue: 1.1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnimation, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ]),
                {iterations: 2},
            ).start();
        } else if (summary.totalPrice <= 500) {
            setShowConfetti(false);
            hasShownCongrats.current = false;
            scaleAnimation.setValue(1);
        }
    }, [scaleAnimation, showConfetti, slideAnimation, summary.totalItems, summary.totalPrice]);

    return (
        <View style={[styles.container, {shadowOpacity: 0.2, shadowColor: 'black'}]}>
            <View style={[styles.flexRowBetween, styles.padding]}>
                <TouchableOpacity style={styles.searchInputContainer} activeOpacity={0.8}>
                    <Icon size={RFValue(20)} name={'search'} iconFamily={'Ionicons'} color={Colors.active} />
                    <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer} {...({} as any)}>
                        {searchItems.map((item, index) => {
                            return (
                                <CustomText key={index} style={styles.rollingText} fontSize={12} fontFamily={'Okra-Medium'}>
                                    {item}
                                </CustomText>
                            );
                        })}
                    </RollingBar>
                </TouchableOpacity>

                <TouchableOpacity style={styles.flexRowGap}>
                    <Icon size={RFValue(16)} name={'silverware-fork-knife'} iconFamily={'MaterialCommunityIcons'} color={Colors.background} />
                    <CustomText color={Colors.background} fontSize={12} fontFamily={'Okra-Bold'}>
                        Menu
                    </CustomText>
                </TouchableOpacity>
            </View>

            {showOffer && (
                <Animated.View style={{transform: [{translateY}]}}>
                    <LinearGradient colors={showConfetti ? ['#3A7BD5', '#3A6073'] : ['#E9425E', '#9145B6']} start={{x: 1, y: 0}} end={{x: 1, y: 1.2}} style={styles.offerContainer}>
                        <View style={{padding: 15, paddingBottom: Platform.OS === 'ios' ? 25 : 15, paddingHorizontal: 20}}>
                            {showConfetti && <LottieView source={Confetti2Lottie} style={styles.confetti} autoPlay={true} loop={false} onAnimationFinish={() => setShowConfetti(false)} />}
                            <TouchableOpacity style={styles.offerContent} activeOpacity={0.8} onPress={async () => await navigate(screens.checkoutScreen, {restaurant})}>
                                <AnimatedNumbers includeComma={false} animationDuration={300} animateToNumber={summary?.totalItems} fontStyle={styles.animatedCount} />
                                <CustomText style={styles.offerText}>{` item${summary.totalItems > 1 ? 's' : ''}`} added</CustomText>
                                <Icon size={RFValue(14)} name={'arrow-right-circle'} iconFamily={'MaterialCommunityIcons'} color={'#FFF'} />
                            </TouchableOpacity>
                            <Animated.Text style={[styles.offerSubtitle, {transform: [{scale: scaleAnimation}]}]}>{summary.totalPrice > 500 ? 'Congratulations! You get an extra 15% OFF!' : `Add items worth ₹${Math.max(1, 500 - summary.totalPrice)} more to get extra 15% OFF`}</Animated.Text>
                        </View>
                    </LinearGradient>
                </Animated.View>
            )}
        </View>
    );
}

export default memo(SearchAndOffers);
