import {useMemo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {RFValue} from 'react-native-responsive-fontsize';
import screens from '@/utils/screens.ts';
import {Colors} from '@/unistyles/Constants.tsx';
import Icon from '@/components/global/Icon.tsx';
import {navigate} from '@/utils/NavigationUtils.ts';
import {cartStyles} from '@/unistyles/cartStyles.tsx';
import {useAppDispatch} from '@/states/reduxHook.ts';
import CustomText from '@/components/global/CustomText.tsx';
import {clearRestaurantCart, RestaurantCart} from '@/states/reducers/cartSlice.ts';

function CartItem({item}: {item: RestaurantCart}) {
    const dispatch = useAppDispatch();
    const {styles} = useStyles(cartStyles);

    const deleteCart = async (id: any) => {
        dispatch(clearRestaurantCart({restaurantId: id}));
    };

    const totalItems = useMemo(() => {
        return item.items.reduce((acc: any, item: any) => {
            acc += item.quantity;
            return acc;
        }, 0);
    }, [item.items]);

    return (
        <View style={styles.cartItemContainer}>
            <View style={styles.flexRowGap}>
                <Image source={{uri: item?.restaurant?.imageUrl}} style={styles.image} />
                <View>
                    <CustomText fontFamily={'Okra-Medium'} fontSize={10}>
                        {item?.restaurant?.name}
                    </CustomText>
                    <TouchableOpacity style={styles.flexRow} onPress={async () => await navigate(screens.restaurantDetailsScreen, {restaurant: item.restaurant})}>
                        <CustomText style={{top: -1}} fontSize={9} fontFamily={'Okra-Medium'}>
                            View Menu
                        </CustomText>
                        <Icon size={12} name={'chevron-right'} iconFamily={'MaterialIcons'} color={Colors.active} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.flexRowGap}>
                <TouchableOpacity style={styles.cartButton} onPress={async () => await navigate(screens.checkoutScreen, {restaurant: item.restaurant})}>
                    <CustomText fontFamily={'Okra-Bold'} color={'#FFF'} fontSize={10}>
                        View Cart
                    </CustomText>
                    <CustomText fontFamily={'Okra-Medium'} color={'#FFF'} fontSize={8}>
                        {totalItems} item(s)
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => deleteCart(item?.restaurant.id)}>
                    <Icon size={RFValue(12)} name={'close'} iconFamily={'MaterialCommunityIcons'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CartItem;
