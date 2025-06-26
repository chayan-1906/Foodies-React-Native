import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {IRepeatFoodModalProps} from '../../types';
import {useAppSelector} from '@states/reduxHook.ts';
import {selectRestaurantCartItem} from '@states/reducers/cartSlice.ts';
import {useStyles} from 'react-native-unistyles';
import {modalStyles} from '@unistyles/modalStyles.tsx';
import {useEffect} from 'react';
import CustomText from '@components/global/CustomText.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';
import MiniFoodCard from '@components/restaurants/MiniFoodCard.tsx';

function RepeatFoodModal({item, restaurant, onOpenAddFoodModal, closeModal}: IRepeatFoodModalProps) {
    const cartItem = useAppSelector(selectRestaurantCartItem(restaurant.id, item.id));
    const {styles} = useStyles(modalStyles);

    useEffect(() => {
        if (!cartItem) {
            closeModal();
        }
    }, [cartItem]);

    return (
        <View>
            <View style={styles.noShadowHeaderContainer}>
                <View style={styles.flexRowGap}>
                    <CustomText fontFamily={Fonts.Bold} fontSize={13}>
                        Repeat last used customization?
                    </CustomText>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainerWhiteBackground}>
                {cartItem?.customizations?.map((customization, index) => {
                    return <MiniFoodCard key={index} item={item} customization={customization} restaurant={restaurant} />;
                })}
            </ScrollView>

            <View style={styles.noShadowFooterContainer}>
                <TouchableOpacity onPress={onOpenAddFoodModal}>
                    <CustomText fontFamily={Fonts.Bold} color={Colors.active} fontSize={11}>
                        + Add new customization
                    </CustomText>
                </TouchableOpacity>
            </View>
            <SafeAreaView />
        </View>
    );
}

export default RepeatFoodModal;
