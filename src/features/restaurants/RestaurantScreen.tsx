import {FlatList, Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {useStyles} from 'react-native-unistyles';
import {restaurantHeaderStyles} from '@unistyles/restaurantStyles.tsx';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView.tsx';
import SortingAndFilters from '@components/home/SortingAndFilters.tsx';
import {restaurantItemsData, restaurantsItemFiltersOption} from '@utils/dummyData.ts';
import {IFoodItem, IRestaurantItem} from '../../types';
import RestaurantHeader from '@components/restaurants/RestaurantHeader.tsx';
import DottedLine from '@components/ui/DottedLine.tsx';
import FoodCard from '@components/restaurants/FoodCard.tsx';
import SearchAndOffers from '@components/restaurants/SearchAndOffers.tsx';

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
