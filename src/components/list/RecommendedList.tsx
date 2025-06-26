import {FlatList, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles.tsx';
import {IRecommendedItem} from '../../types';
import ScalePress from '@components/ui/ScalePress.tsx';
import {navigate} from '@utils/NavigationUtils.ts';
import screens from '@utils/screens.ts';
import CustomText from '@components/global/CustomText.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';
import CustomGradient from '@components/global/CustomGradient.tsx';
import {recommendedListData} from '@utils/dummyData.ts';

function RecommendedList() {
    const {styles} = useStyles(cardStyles);

    const renderItem = ({item}: {item: IRecommendedItem}) => {
        return (
            <ScalePress style={styles.itemContainer} onPress={async () => await navigate(screens.restaurantDetailsScreen, {item})}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item?.imageUrl}} style={styles.itemImage} />
                    {item?.discount && (
                        <View style={styles.discountContainer}>
                            <CustomText color={Colors.background} fontSize={10} fontFamily={Fonts.Bold}>
                                {item?.discount}
                            </CustomText>
                            {item?.discountAmount && (
                                <CustomText style={{lineHeight: 11}} color={Colors.background} fontSize={9} fontFamily={Fonts.Medium}>
                                    {item?.discountAmount}
                                </CustomText>
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.bookmarkIcon}>
                        <Image source={require('@assets/icons/bookmark.png')} style={styles.bookmarkIconImage} />
                    </TouchableOpacity>

                    <CustomGradient position={'bottom'} />
                </View>

                <View style={styles.itemInfo}>
                    <CustomText fontSize={10} color={Colors.text} fontFamily={Fonts.Medium} numberOfLines={1}>
                        {item?.name}
                    </CustomText>

                    <View style={styles.flexRow}>
                        <Image source={require('@assets/icons/clock.png')} style={styles.clockIcon} />
                        <CustomText fontFamily={Fonts.Medium} color={Colors.lightText} fontSize={9} numberOfLines={1}>{`${item.time} • ${item.distance}`}</CustomText>
                    </View>
                </View>
            </ScalePress>
        );
    };

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList data={recommendedListData} renderItem={renderItem} numColumns={Math.ceil(recommendedListData.length / 2)} scrollEnabled={false} keyExtractor={item => item?.id?.toString()} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listContainer} style={styles.recommendedContainer} />
        </ScrollView>
    );
}

export default RecommendedList;
