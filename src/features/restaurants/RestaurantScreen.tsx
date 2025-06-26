import {FlatList, Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {useStyles} from 'react-native-unistyles';
import {IFoodItem, IRestaurantItem} from '@/types';
import DottedLine from '@/components/ui/DottedLine.tsx';
import FoodCard from '@/components/restaurants/FoodCard.tsx';
import {restaurantHeaderStyles} from '@/unistyles/restaurantStyles.tsx';
import SortingAndFilters from '@/components/home/SortingAndFilters.tsx';
import SearchAndOffers from '@/components/restaurants/SearchAndOffers.tsx';
import CustomSafeAreaView from '@/components/global/CustomSafeAreaView.tsx';
import RestaurantHeader from '@/components/restaurants/RestaurantHeader.tsx';
import {restaurantItemsData, restaurantsItemFiltersOption} from '@/utils/dummyData.ts';

function RestaurantScreen() {
    const route = useRoute() as any;
    const restaurant = route?.params?.restaurant as IRestaurantItem;
    const {styles} = useStyles(restaurantHeaderStyles);
    const insets = useSafeAreaInsets();

    const renderItem = ({item}: {item: IFoodItem}) => {
        return <FoodCard food={item} restaurant={restaurant} />;
    };

    return (
        <>
            <View style={{height: Platform.OS === 'android' ? insets.top : 0}} />
            <CustomSafeAreaView>
                <RestaurantHeader title={restaurant.name} />
                <View style={styles.sortingContainer}>
                    <SortingAndFilters menuTitle={'Filter'} options={restaurantsItemFiltersOption} />
                </View>
                <FlatList
                    data={restaurantItemsData}
                    renderItem={renderItem}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => (
                        <View>
                            <DottedLine />
                        </View>
                    )}
                    contentContainerStyle={styles.scrollContainer}
                />
                <SearchAndOffers restaurant={restaurant} />
            </CustomSafeAreaView>
        </>
    );
}

export default RestaurantScreen;
