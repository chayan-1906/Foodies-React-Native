import {FlatList, Image, ScrollView} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {IRecommendedItem} from '@/types';
import {cardStyles} from '@/unistyles/cardStyles.tsx';
import ScalePress from '@/components/ui/ScalePress.tsx';
import {regularFoodData} from '@/utils/dummyData.ts';

function RegularFoodList() {
    const {styles} = useStyles(cardStyles);

    const renderItem = ({item}: {item: IRecommendedItem}) => {
        return (
            <ScalePress style={styles.itemContainer}>
                <Image source={{uri: item?.imageUrl}} style={styles.regularFoodImage} />
            </ScalePress>
        );
    };

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList data={regularFoodData} renderItem={renderItem} numColumns={Math.ceil(regularFoodData?.length / 2)} scrollEnabled={false} keyExtractor={item => item?.id?.toString()} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.regularFoodContainer} style={styles.regularFoodContainer} />
        </ScrollView>
    );
}

export default RegularFoodList;
