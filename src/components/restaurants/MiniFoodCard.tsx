import {memo, useRef} from 'react';
import {useStyles} from 'react-native-unistyles';
import {ICustomization, MiniFoodCardProps} from '../../types';
import {modalStyles} from '@unistyles/modalStyles.tsx';
import {useAppDispatch, useAppSelector} from '@states/reduxHook.ts';
import {addCustomizableItem, removeCustomizableItem, selectRestaurantCartItem} from '@states/reducers/cartSlice.ts';
import EditFoodModal from '@components/modal/EditFoodModal.tsx';
import CustomModal from '@components/modal/CustomModal.tsx';
import {Image, TouchableOpacity, View} from 'react-native';
import CustomText from '@components/global/CustomText.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';
import Icon from '@components/global/Icon.tsx';
import {RFValue} from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';

function MiniFoodCard({item, customization, restaurant}: MiniFoodCardProps) {
    const {styles} = useStyles(modalStyles);
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector(selectRestaurantCartItem(restaurant?.id, item?.id));
    const modalRef = useRef<any>(null);

    const openEditModal = () => {
        modalRef?.current?.openModal(<EditFoodModal item={item as ICustomization} customization={customization as ICustomization} restaurant={restaurant} onClose={() => modalRef?.current?.closeModal()} />);
    };

    const addCartHandler = (customization: any) => {
        const data = {
            restaurant,
            item,
            customization: {
                quantity: 1,
                price: customization?.price,
                customizationOptions: customization?.customizationOptions,
            } as ICustomization,
        };

        dispatch(addCustomizableItem(data));
    };

    const removeCartHandler = (customization: any) => {
        dispatch(
            removeCustomizableItem({
                restaurantId: restaurant?.id,
                customizationId: customization?.id,
                cartItemId: item?.id,
            }),
        );
    };

    return (
        <>
            <CustomModal ref={modalRef} />
            <View style={styles.flexRowItemBaseline}>
                <View style={styles.flexRowGapBaseline}>
                    <Image source={cartItem?.isVeg ? require('@assets/icons/veg.png') : require('@assets/icons/non_veg.png')} style={styles.vegIcon} />

                    <View>
                        <CustomText fontFamily={Fonts.Bold}>{cartItem?.name}</CustomText>
                        <CustomText fontFamily={Fonts.Medium}>{customization?.price}</CustomText>
                        <CustomText fontFamily={Fonts.Medium} style={styles.selectedOptions}>
                            {customization?.customizationOptions?.map((i: any, idx: number) => {
                                return (
                                    <CustomText key={idx} fontFamily={Fonts.Medium} fontSize={9}>
                                        {i?.selectedOption?.name}
                                    </CustomText>
                                );
                            })}
                        </CustomText>

                        <TouchableOpacity style={styles.flexRow} onPress={openEditModal}>
                            <CustomText fontFamily={Fonts.Medium} color={'#444'} fontSize={9}>
                                Edit
                            </CustomText>
                            <View style={{bottom: -1}}>
                                <Icon size={16} name={'arrow-right'} iconFamily={'MaterialIcons'} color={'#888'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cartOperationContainer}>
                    <View style={styles.miniAddButtonContainer}>
                        <TouchableOpacity onPress={() => removeCartHandler(customization)}>
                            <Icon size={RFValue(10)} name={'minus-thick'} iconFamily={'MaterialCommunityIcons'} color={Colors.active} />
                        </TouchableOpacity>
                        <AnimatedNumbers includeComma={false} animationDuration={300} fontStyle={styles.miniAnimatedCount} animateToNumber={customization?.quantity} />
                        <TouchableOpacity onPress={() => addCartHandler(customization)}>
                            <Icon size={RFValue(10)} name={'plus-thick'} iconFamily={'MaterialCommunityIcons'} color={Colors.active} />
                        </TouchableOpacity>
                    </View>
                    <CustomText fontFamily={Fonts.Medium}>₹{customization.cartPrice}</CustomText>
                </View>
            </View>
        </>
    );
}

export default memo(MiniFoodCard);
