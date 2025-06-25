import {StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RestaurantItem} from '../../types';
import {useAppDispatch} from '@states/reduxHook.ts';
import {useEffect} from 'react';
import {replace} from '@utils/NavigationUtils.ts';
import screens from '@utils/screens.ts';
import {clearRestaurantCart} from '@states/reducers/cartSlice.ts';
import {Colors, screenWidth} from '@unistyles/Constants.tsx';
import LottieView from 'lottie-react-native';
import CustomText from '@components/global/CustomText.tsx';

function OrderSuccessScreen() {
    const route = useRoute() as any;
    const restaurant = route.params.restaurant as RestaurantItem;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            await replace(screens.userBottomTab);
            dispatch(clearRestaurantCart({restaurantId: restaurant.id}));
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={styles.container}>
            <LottieView source={require('@assets/animations/confirm.json')} autoPlay={true} duration={2000} loop={false} speed={1} style={styles.lottieView} enableMergePathsAndroidForKitKatAndAbove={true} hardwareAccelerationAndroid={true} />
            <CustomText fontSize={12} fontFamily={'Okra-Bold'} style={styles.orderPlaceText}>
                ORDER PLACED
            </CustomText>
            <View style={styles.deliveryContainer}>
                <CustomText variant={'h4'} fontFamily={'Okra-Bold'} style={styles.deliveryText}>
                    Delivering to Home
                </CustomText>
            </View>
            <CustomText fontSize={12} fontFamily={'Okra-Regular'} style={styles.addressText}>
                Pochinki, Erangel ({restaurant?.name})
            </CustomText>
        </View>
    );
}

export default OrderSuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieView: {
        width: screenWidth * 0.6,
        height: 150,
    },
    orderPlaceText: {
        opacity: 0.4,
    },
    deliveryContainer: {
        borderBottomWidth: 2,
        paddingBottom: 4,
        marginBottom: 5,
        borderColor: Colors.active,
    },
    deliveryText: {
        marginTop: 15,
        borderColor: Colors.active,
    },
    addressText: {
        opacity: 0.8,
    },
});
