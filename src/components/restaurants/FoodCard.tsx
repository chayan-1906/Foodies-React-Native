import {memo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {IFoodItem, IRestaurantItem} from "@/types";
import {foodStyles} from "@/unistyles/foodStyles.tsx";
import CustomText from "@/components/global/CustomText.tsx";
import {Colors, Fonts} from "@/unistyles/Constants.tsx";
import Icon from "@/components/global/Icon.tsx";
import AddButton from "@/components/restaurants/AddButton.tsx";
import VegIcon from '../../../assets/icons/veg.png';
import NonVegIcon from '../../../assets/icons/non_veg.png';

function FoodCard({food, restaurant}: { food: IFoodItem; restaurant: IRestaurantItem }) {
    const {styles} = useStyles(foodStyles);
    const {name, description, price, image, isVeg} = food;

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Image source={isVeg ? VegIcon : NonVegIcon} style={styles.vegIcon}/>
                <CustomText fontSize={12} numberOfLines={1} fontFamily={Fonts.Medium}>
                    {name}
                </CustomText>
                <CustomText fontSize={10} numberOfLines={2} style={styles.lowOpacity}>
                    {description}
                </CustomText>
                <CustomText fontSize={11} numberOfLines={1} fontFamily={Fonts.Medium}>
                    ₹{price}
                </CustomText>

                <TouchableOpacity style={styles.addToCollectionContainer}>
                    <Icon size={16} name={'bookmark-outline'} iconFamily={'Ionicons'} color={Colors.primary}/>
                    <CustomText color={'#888'} fontFamily={Fonts.Medium} fontSize={9.5}>
                        Add to Collection
                    </CustomText>
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <View style={styles.image}>
                    <Image source={{uri: image}} style={styles.foodImage}/>
                    <AddButton item={food} restaurant={restaurant}/>
                </View>
            </View>
        </View>
    );
}

export default memo(FoodCard);
