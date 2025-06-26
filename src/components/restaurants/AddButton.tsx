import {TouchableOpacity, View} from 'react-native';
import {memo, useCallback, useRef} from 'react';
import {FoodItem, ICartItem, RestaurantItem} from '../../types';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '@unistyles/foodStyles.tsx';
import CustomText from '@components/global/CustomText.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';
import Icon from '@components/global/Icon.tsx';
import ScalePress from '@components/ui/ScalePress.tsx';
import {RFValue} from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useAppDispatch, useAppSelector} from '@states/reduxHook.ts';
import {addItemToCart, removeCustomizableItem, removeItemFromCart, selectRestaurantCartItem} from '@states/reducers/cartSlice.ts';
import CustomModal from '@components/modal/CustomModal.tsx';
import AddFoodModal from '@components/modal/AddFoodModal.tsx';
import RepeatFoodModal from '@components/modal/RepeatFoodModal.tsx';
import RemoveFoodModal from '@components/modal/RemoveFoodModal.tsx';

function AddButton({item, restaurant}: {item: FoodItem | ICartItem; restaurant: RestaurantItem}) {
    const dispatch = useAppDispatch();
    const {styles} = useStyles(foodStyles);
    const {id: itemId, isCustomizable} = item;
    const {id: restaurantId} = restaurant;
    const cart = useAppSelector(selectRestaurantCartItem(restaurantId, itemId));
    const modalRef = useRef<any>(null);

    const isCartItem = (item: FoodItem | ICartItem): item is ICartItem => {
        return 'quantity' in item;
    };

    const openAddModal = () => {
        if (!isCartItem(item)) {
            modalRef?.current?.openModal(<AddFoodModal food={item} restaurant={restaurant} onClose={() => modalRef?.current?.closeModal()} />);
        }
    };

    const openRepeatModal = () => {
        if (isCartItem(item)) {
            modalRef?.current?.openModal(<RepeatFoodModal item={item} restaurant={restaurant} onOpenAddFoodModal={openAddModal} closeModal={() => modalRef?.current?.closeModal()} />);
        }
    };

    const openRemoveModal = () => {
        if (isCartItem(item)) {
            modalRef?.current?.openModal(<RemoveFoodModal item={item} restaurant={restaurant} closeModal={() => modalRef?.current?.closeModal()} />);
        }
    };

    const addCartHandler = useCallback(() => {
        if (isCustomizable) {
            if (cart !== null) {
                openRepeatModal();
                return;
            }
            openAddModal();
        } else {
            dispatch(
                addItemToCart({
                    restaurant,
                    cartItem: {
                        ...item,
                        customizations: [],
                        quantity: 1,
                        cartPrice: item.price,
                    },
                }),
            );
        }
    }, [dispatch, item, restaurant, cart]);

    const removeCartHandler = useCallback(() => {
        if (isCustomizable) {
            if (cart?.customizations && cart?.customizations.length > 1) {
                openRemoveModal();
                return;
            }
            dispatch(
                removeCustomizableItem({
                    restaurantId,
                    customizationId: cart?.customizations![0]?.id || '',
                    cartItemId: itemId,
                }),
            );
        } else {
            dispatch(
                removeItemFromCart({
                    restaurantId: restaurantId,
                    cartItemId: itemId,
                }),
            );
        }
    }, [dispatch, item, restaurant, cart]);

    return (
        <>
            <CustomModal ref={modalRef} />
            <View style={styles.addButtonContainer(cart !== null)}>
                {cart ? (
                    <View style={styles.selectedContainer}>
                        <ScalePress onPress={removeCartHandler}>
                            <Icon size={RFValue(13)} name={'minus-thick'} iconFamily={'MaterialCommunityIcons'} color={'#FFF'} />
                        </ScalePress>
                        <AnimatedNumbers includeComma={false} animationDuration={300} animateToNumber={cart?.quantity} fontStyle={styles.animatedCount} />
                        <ScalePress onPress={addCartHandler}>
                            <Icon size={RFValue(13)} name={'plus-thick'} iconFamily={'MaterialCommunityIcons'} color={'#FFF'} />
                        </ScalePress>
                    </View>
                ) : (
                    <TouchableOpacity onPress={addCartHandler} style={styles.noSelectionContainer} activeOpacity={0.6} accessibilityLabel={'Add item to cart'}>
                        <CustomText fontFamily={Fonts.Bold} variant={'h5'} color={Colors.primary}>
                            ADD
                        </CustomText>
                        <CustomText variant={'h5'} color={Colors.primary} style={styles.plusSmallIcon}>
                            +
                        </CustomText>
                    </TouchableOpacity>
                )}
            </View>

            {isCustomizable && (
                <CustomText fontFamily={Fonts.Medium} style={styles.customizeText}>
                    Customizable
                </CustomText>
            )}
        </>
    );
}

export default memo(AddButton);
