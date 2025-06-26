import {memo, useCallback} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {RFValue} from 'react-native-responsive-fontsize';
import AnimatedNumber from 'react-native-animated-numbers';
import {useAppDispatch} from '@/states/reduxHook.ts';
import {modalStyles} from '@/unistyles/modalStyles.tsx';
import {addItemToCart, removeItemFromCart} from '@/states/reducers/cartSlice.ts';
import CustomText from '@/components/global/CustomText.tsx';
import Icon from '@/components/global/Icon.tsx';
import {Colors} from '@/unistyles/Constants.tsx';
import VegIcon from '@/assets/icons/veg.png';
import NonVegIcon from '@/assets/icons/non_veg.png';

function NonCustomizableCard({item, restaurant}: {item: any; restaurant: any}) {
    const dispatch = useAppDispatch();
    const {styles} = useStyles(modalStyles);

    const addCartHandler = useCallback(() => {
        dispatch(addItemToCart({restaurant, cartItem: {...item, customizations: []}}));
    }, [dispatch, restaurant?.id, item]);

    const removeCartHandler = useCallback(() => {
        dispatch(removeItemFromCart({restaurantId: restaurant?.id, cartItemId: item.id}));
    }, [dispatch, restaurant?.id, item]);

    return (
        <View style={styles.flexRowItemBaseline}>
            <View style={styles.flexRowGapBaseline}>
                <Image source={item.isVeg ? VegIcon : NonVegIcon} style={styles.vegIcon} />
                <View>
                    <CustomText fontFamily={'Okra-Bold'}>{item?.name}</CustomText>
                    <CustomText fontFamily={'Okra-Medium'}>{item?.price}</CustomText>
                </View>
            </View>

            <View style={styles.cartOperationContainer}>
                <View style={styles.miniAddButtonContainer}>
                    <TouchableOpacity onPress={removeCartHandler}>
                        <Icon size={RFValue(10)} name={'minus-thick'} iconFamily={'MaterialCommunityIcons'} color={Colors.active} />
                    </TouchableOpacity>
                    <AnimatedNumber includeComma={false} animationDuration={300} animateToNumber={item?.quantity} fontStyle={styles.miniAnimatedCount} />
                    <TouchableOpacity onPress={addCartHandler}>
                        <Icon size={RFValue(10)} name={'plus-thick'} iconFamily={'MaterialCommunityIcons'} color={Colors.active} />
                    </TouchableOpacity>
                </View>
                <CustomText fontFamily={'Okra-Medium'}>₹{item?.cartPrice}</CustomText>
            </View>
        </View>
    );
}

export default memo(NonCustomizableCard);
