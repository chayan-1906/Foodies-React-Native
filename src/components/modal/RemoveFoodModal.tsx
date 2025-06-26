import {useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {IRemoveFoodModalProps} from '@/types';
import {useAppSelector} from '@/states/reduxHook.ts';
import {modalStyles} from '@/unistyles/modalStyles.tsx';
import CustomText from '@/components/global/CustomText.tsx';
import MiniFoodCard from '@/components/restaurants/MiniFoodCard.tsx';
import {selectRestaurantCartItem} from '@/states/reducers/cartSlice.ts';

function RemoveFoodModal({item, restaurant, closeModal}: IRemoveFoodModalProps) {
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
                    <CustomText fontFamily={'Okra-Bold'} fontSize={13}>
                        Customizations for {item?.name}
                    </CustomText>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainerWhiteBackground}>
                {cartItem?.customizations?.map((customization, index) => {
                    return <MiniFoodCard key={customization?.id} item={item} customization={customization} restaurant={restaurant} />;
                })}
            </ScrollView>

            <SafeAreaView />
        </View>
    );
}

export default RemoveFoodModal;
