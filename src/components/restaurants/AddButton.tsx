import {TouchableOpacity, View} from 'react-native';
import {memo, useCallback, useRef} from 'react';
import {FoodItem, RestaurantItem} from '../../types';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '@unistyles/foodStyles.tsx';
import CustomText from '@components/global/CustomText.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';
import Icon from '@components/global/Icon.tsx';
import ScalePress from '@components/ui/ScalePress.tsx';
import {RFValue} from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useAppDispatch, useAppSelector} from '@states/reduxHook.ts';
import {selectRestaurantCartItem} from '@states/reducers/cartSlice.ts';

function AddButton({food, restaurant}: {food: FoodItem; restaurant: RestaurantItem}) {
    const dispatch = useAppDispatch();
    const {styles} = useStyles(foodStyles);
    const {id: foodId, isCustomizable} = food;
    const {id: restaurantId} = restaurant;
    const cart = useAppSelector(selectRestaurantCartItem(restaurantId, foodId));
    const modalRef = useRef<any>(null);

    const addCartHandler = useCallback(() => {
        if (isCustomizable) {
        } else {
        }
    }, [dispatch, food, restaurant, cart]);

    const removeCartHandler = useCallback(() => {
        if (isCustomizable) {
        } else {
        }
    }, [dispatch, food, restaurant, cart]);

    return (
        <>
            <View style={styles.addButtonContainer(cart !== null)}>
                {cart ? (
                    <View style={styles.selectedContainer}>
                        <ScalePress onPress={removeCartHandler}>
                            <Icon size={RFValue(13)} name={'minus-thick'} iconFamily={'MaterialCommunityIcons'} color={'#FFF'} />
                        </ScalePress>
                        <AnimatedNumbers includeComma={false} animationDuration={300} animateToNumber={cart?.quantity} fontStyle={styles.animatedCount} />
                        <ScalePress>
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
