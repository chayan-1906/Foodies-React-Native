import {Image, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {IRestaurantItem} from '@/types';
import {restaurantStyles} from '@/unistyles/restaurantStyles.tsx';
import ScalePress from '@/components/ui/ScalePress.tsx';
import {navigate} from '@/utils/NavigationUtils.ts';
import screens from '@/utils/screens.ts';
import CustomText from '@/components/global/CustomText.tsx';
import {Fonts} from '@/unistyles/Constants.tsx';
import StarRating from '@/components/ui/StarRating.tsx';
import DottedLine from '@/components/ui/DottedLine.tsx';

function RestaurantCard({restaurant}: {restaurant: IRestaurantItem}) {
    const {styles} = useStyles(restaurantStyles);

    return (
        <ScalePress style={{marginBottom: 25, paddingHorizontal: 16}} onPress={() => navigate(screens.restaurantDetailsScreen, {restaurant})}>
            <View style={styles.card}>
                <View>
                    <Image source={{uri: restaurant.imageUrl}} style={styles.image} />
                </View>

                <View style={styles.info}>
                    <View style={styles.textContainer}>
                        <View style={styles.textPart}>
                            <CustomText variant={'h5'} style={styles.name} numberOfLines={1} fontFamily={Fonts.Bold}>
                                {restaurant.name}
                            </CustomText>
                            <CustomText fontFamily={Fonts.Medium}>
                                {restaurant.time} • {restaurant.distance} • ₹150 for one
                            </CustomText>
                        </View>

                        {restaurant.rating && <StarRating rating={restaurant.rating} />}
                    </View>

                    <DottedLine />
                    {restaurant.discount && (
                        <CustomText fontFamily={Fonts.Medium}>
                            {restaurant.discount} {restaurant.discountAmount && `• ${restaurant.discountAmount}`}
                        </CustomText>
                    )}
                </View>
            </View>
        </ScalePress>
    );
}

export default RestaurantCard;
