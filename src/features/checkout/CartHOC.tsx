import {useState} from 'react';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useStyles} from 'react-native-unistyles';
import {cartStyles} from '@/unistyles/cartStyles.tsx';
import {useAppSelector} from '@/states/reduxHook.ts';
import {useSharedState} from '@/features/tabs/SharedContext.tsx';
import {clearAllCarts} from '@/states/reducers/cartSlice.ts';
import CustomText from '@/components/global/CustomText.tsx';
import {Colors} from '@/unistyles/Constants.tsx';
import Icon from '@/components/global/Icon.tsx';
import LinearGradient from 'react-native-linear-gradient';
import CartItem from '@/features/checkout/CartItem.tsx';

function CartHOC() {
    const dispatch = useDispatch();
    const carts = useAppSelector(state => state.cart.carts);
    const {scrollY} = useSharedState();
    const insets = useSafeAreaInsets();
    const {styles} = useStyles(cartStyles);
    const [isExpand, setIsExpand] = useState(false);
    const totalCartsLength = carts?.length;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: scrollY.value === 1 ? withTiming(Platform.OS === 'ios' ? -15 : 0, {duration: 300}) : withTiming(Platform.OS === 'ios' ? -90 : -100, {duration: 300}),
            },
        ],
    }));

    const clearCart = async () => {
        dispatch(clearAllCarts());
        setIsExpand(false);
    };

    if (!totalCartsLength) return null;

    return (
        <Animated.View style={[isExpand ? styles.expandedCartContainer : styles.cartContainer, animatedStyle, {paddingBottom: !isExpand ? (Platform.OS === 'android' ? insets.bottom + 40 : insets.bottom + 16) : 0}]}>
            {carts?.length > 1 && !isExpand && (
                <TouchableOpacity activeOpacity={0.9} style={styles.moreButton} onPress={() => setIsExpand(true)}>
                    <CustomText style={{top: -1}} color={Colors.active} fontSize={9} fontFamily={'Okra-Medium'}>
                        + {carts?.length - 1} more
                    </CustomText>
                    <Icon size={10} name={'caret-up-outline'} iconFamily={'Ionicons'} color={Colors.active} />
                </TouchableOpacity>
            )}
            {Platform.OS === 'ios' && isExpand && <BlurView style={styles.absolute} blurType={'light'} blurAmount={10} />}
            {isExpand && <View style={styles.contentContainer} />}
            {isExpand && (
                <TouchableOpacity style={styles.closeIcon} onPress={() => setIsExpand(false)}>
                    <Icon size={20} name={'close'} iconFamily={'Ionicons'} color={'#FFF'} />
                </TouchableOpacity>
            )}
            {isExpand ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.flexRowBetween}>
                        <CustomText variant={'h5'} fontFamily={'Okra-Medium'}>
                            Your Carts
                        </CustomText>
                        <TouchableOpacity onPress={clearCart}>
                            <CustomText fontSize={10} fontFamily={'Okra-Bold'} color={Colors.active}>
                                Clear All
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {carts?.map((item, index) => {
                        return (
                            <View key={index} style={[{position: !isExpand ? 'absolute' : 'relative'}, !isExpand && {transform: [{scale: index === totalCartsLength - 1 ? 1 : 0.98}]}, !isExpand && {top: !isExpand ? (index === totalCartsLength - 1 ? 0 : -8) : undefined}, !isExpand && {zIndex: !isExpand ? (index === totalCartsLength - 1 ? 99 : 98) : undefined}, isExpand && {width: '100%'}]}>
                                <CartItem item={item} />
                            </View>
                        );
                    })}
                </ScrollView>
            ) : (
                <>
                    {carts.map((item, index) => {
                        return (
                            <View key={index} style={[{position: !isExpand ? 'absolute' : 'relative'}, !isExpand && {transform: [{scale: index === totalCartsLength - 1 ? 1 : 0.98}]}, !isExpand && {top: !isExpand ? (index === totalCartsLength - 1 ? 0 : -8) : undefined}, !isExpand && {zIndex: !isExpand ? (index === totalCartsLength - 1 ? 99 : 98) : undefined}, isExpand && {width: '100%'}]}>
                                <CartItem item={item} />
                            </View>
                        );
                    })}
                </>
            )}
            {!isExpand && <LinearGradient colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.98)', 'rgba(255,255,255,1)']} style={{position: 'absolute', width: '100%', height: 92, zIndex: -1, bottom: -20}} />}
        </Animated.View>
    );
}

export default CartHOC;
