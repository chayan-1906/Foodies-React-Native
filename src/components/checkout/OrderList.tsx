import {Image, StyleSheet, View} from 'react-native';
import {IRestaurantItem} from '@/types';
import {Colors} from '@/unistyles/Constants.tsx';
import CustomText from '@/components/global/CustomText.tsx';
import MiniFoodCard from '@/components/restaurants/MiniFoodCard.tsx';
import NonCustomizableCard from '@/components/checkout/NonCustomizableCard.tsx';
import ClockIcon from '@/assets/icons/clock.png';

function OrderList({restaurant, cartItems, totalItems}: {restaurant: IRestaurantItem; cartItems: any; totalItems: number}) {
    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <View style={styles.imgContainer}>
                    <Image source={ClockIcon} style={styles.img} />
                </View>
                <View>
                    <CustomText fontSize={12} fontFamily={'Okra-Bold'}>
                        Delivery in 30 minutes
                    </CustomText>
                    <CustomText variant={'h6'} fontFamily={'Okra-Medium'} style={{opacity: 0.5}}>
                        Shipment of {totalItems} item(s)
                    </CustomText>
                </View>
            </View>
            {cartItems?.map((cartItem: any, index: number) => {
                return (
                    <View key={index} style={styles.subContainer}>
                        {cartItem?.isCustomizable ? (
                            <>
                                {cartItem?.customizations?.map((customization: any, idx: number) => {
                                    return <MiniFoodCard key={idx} customization={customization} item={cartItem} restaurant={restaurant} />;
                                })}
                            </>
                        ) : (
                            <NonCustomizableCard item={cartItem} restaurant={restaurant} />
                        )}
                    </View>
                );
            })}
        </View>
    );
}

export default OrderList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 15,
    },
    subContainer: {
        margin: 10,
    },
    img: {
        width: 30,
        height: 30,
    },
    imgContainer: {
        backgroundColor: Colors.background_light,
        padding: 30,
        borderRadius: 15,
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
});
