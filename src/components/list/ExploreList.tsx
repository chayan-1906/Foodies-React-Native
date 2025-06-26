import {View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles.tsx';
import RecommendedList from '@components/list/RecommendedList.tsx';
import BreakerText from '@components/ui/BreakerText.tsx';
import RegularFoodList from '@components/list/RegularFoodList.tsx';

function ExploreList() {
    const {styles} = useStyles(homeStyles);

    return (
        <View style={styles.topHidingContainer}>
            <RecommendedList />
            <BreakerText text={"WHAT'S ON YOUR MIND?"} />
            <RegularFoodList />
            <BreakerText text={'ALL RESTAURANTS'} />
        </View>
    );
}

export default ExploreList;
