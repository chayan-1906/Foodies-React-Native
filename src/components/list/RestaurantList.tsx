import {FlatList, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles.tsx';
import RestaurantCard from '@components/list/RestaurantCard.tsx';
import {IRestaurantItem} from '../../types';
import CustomText from '@components/global/CustomText.tsx';
import {Fonts} from '@unistyles/Constants.tsx';
import {recommendedListData} from '@utils/dummyData.ts';

function RestaurantList() {
    const {styles} = useStyles(cardStyles);

    const renderItem = ({item}: {item: IRestaurantItem}) => {
        return <RestaurantCard restaurant={item} />;
    };

    return (
        <View>
            <CustomText style={styles.centerText} fontFamily={Fonts.Bold} fontSize={12}>
                1823 restaurants delivering to you
            </CustomText>
            <CustomText style={styles.centerText} fontFamily={Fonts.Medium} fontSize={12}>
                FEATURED
            </CustomText>
            <FlatList
                data={recommendedListData}
                renderItem={renderItem}
                scrollEventThrottle={16}
                bounces={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={restaurant => restaurant.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListFooterComponent={() => {
                    return (
                        <View style={{justifyContent: 'center', alignItems: 'center', opacity: 0.6}}>
                            <CustomText fontFamily={Fonts.Medium} variant={'h1'}>
                                Made with ❤️
                            </CustomText>
                            <CustomText fontFamily={Fonts.Medium} variant={'h5'}>
                                By - Padmanabha Das
                            </CustomText>
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default RestaurantList;
