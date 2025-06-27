import {useEffect, useState} from 'react';
import {Image, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {IRestaurantItem} from '@/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '@/unistyles/Constants.tsx';
import screens from '@/utils/screens.ts';
import Icon from '@/components/global/Icon.tsx';
import {useAppSelector} from '@/states/reduxHook.ts';
import {selectRestaurantCart} from '@/states/reducers/cartSlice.ts';
import {goBack, replace} from '@/utils/NavigationUtils.ts';
import CheckoutHeader from '@/components/checkout/CheckoutHeader.tsx';
import OrderList from '@/components/checkout/OrderList.tsx';
import CustomText from '@/components/global/CustomText.tsx';
import {RFValue} from 'react-native-responsive-fontsize';
import BillDetails from '@/components/checkout/BillDetails.tsx';
import ArrowButton from '@/components/checkout/ArrowButton.tsx';
import CouponIcon from '../../../assets/icons/coupon.png';

function CheckoutScreen() {
    const route = useRoute() as any;
    const restaurant = route.params.restaurant as IRestaurantItem;
    const cart = useAppSelector(selectRestaurantCart(restaurant?.id));
    const totalItemPrice = cart?.reduce((total, item) => total + (item.cartPrice || 0), 0) || 0;
    const totalItems = cart?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
    const insets = useSafeAreaInsets();

    const [isLoading, setIsLoading] = useState(false);

    const handlePlaceOrder = async () => {
        setIsLoading(true);
        setTimeout(async () => {
            setIsLoading(false);
            await replace(screens.orderSuccessScreen, {restaurant});
        }, 2000);
    };

    useEffect(() => {
        if (!cart || cart?.length === 0) {
            goBack();
        }
    }, [cart]);

    return (
        <View style={styles.container}>
            <View style={{height: Platform.OS === 'android' ? insets.top : 0}}/>
            <CheckoutHeader title={restaurant?.name}/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <OrderList restaurant={restaurant} cartItems={cart} totalItems={totalItems}/>
                <View style={styles.flexRowBetween}>
                    <View style={styles.flexRow}>
                        <Image source={CouponIcon} style={{height: 25, width: 25}}/>
                        <CustomText variant={'h6'} fontFamily={'Okra-Medium'}>View all restaurant coupons</CustomText>
                    </View>
                    <Icon size={RFValue(16)} name={'chevron-right'} iconFamily={'MaterialCommunityIcons'} color={Colors.text}/>
                </View>

                <BillDetails totalItemPrice={totalItemPrice}/>

                <View style={styles.flexRowBetween}>
                    <View>
                        <CustomText fontSize={10} fontFamily={'Okra-Medium'}>
                            Cancellation Policy
                        </CustomText>
                        <CustomText fontSize={9} fontFamily={'Okra-Bold'} style={styles.cancelText}>
                            Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable
                        </CustomText>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.paymentGateway}>
                <View style={{width: '30%'}}>
                    <CustomText fontSize={RFValue(6)} fontFamily={'Okra-Medium'}>
                        💰 PAY USING
                    </CustomText>
                    <CustomText fontSize={10} fontFamily={'Okra-Medium'} style={{marginTop: 2}}>
                        Cash on Delivery
                    </CustomText>
                </View>
                <View style={{width: '70%'}}>
                    <ArrowButton title={'Place Order'} onPress={handlePlaceOrder} isLoading={isLoading} price={totalItemPrice}/>
                </View>
            </View>
        </View>
    );
}

export default CheckoutScreen;

const styles = StyleSheet.create({
    cancelText: {
        marginTop: 4,
        opacity: 0.4,
    },
    paymentGateway: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 14,
        backgroundColor: 'white',
        position: 'absolute',
        paddingTop: 10,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.3,
        elevation: 5,
        shadowRadius: 5,
        shadowColor: Colors.lightText,
        bottom: 0,
        paddingBottom: Platform.OS === 'ios' ? 25 : 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContainer: {
        padding: 10,
        backgroundColor: Colors.background_light,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    flexRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
    },
});
