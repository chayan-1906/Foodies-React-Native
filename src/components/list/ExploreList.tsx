import {Pressable, View} from 'react-native';
import {useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles.tsx';
import CustomText from '@components/global/CustomText.tsx';
import Icon from '@components/global/Icon.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';
import RecommendedList from '@components/list/RecommendedList.tsx';
import BreakerText from '@components/ui/BreakerText.tsx';
import RegularFoodList from '@components/list/RegularFoodList.tsx';

function ExploreList() {
    const [tabSelected, setTabSelected] = useState(1);
    const {styles} = useStyles(homeStyles);

    return (
        <View style={styles.topHidingContainer}>
            <View style={styles.flexRowCenter}>
                <Pressable style={styles.leftTab(tabSelected === 1)} onPress={() => setTabSelected(1)}>
                    <CustomText color={tabSelected === 1 ? Colors.text : Colors.lightText} fontFamily={Fonts.Medium}>
                        Recommended
                    </CustomText>
                </Pressable>

                <Pressable style={styles.rightTab(tabSelected === 2)} onPress={() => setTabSelected(2)}>
                    <Icon size={14} name={'bookmark-outline'} iconFamily={'Ionicons'} color={tabSelected === 2 ? Colors.text : Colors.lightText} />
                    <CustomText color={tabSelected === 2 ? Colors.text : Colors.lightText} fontFamily={Fonts.Medium}>
                        Collection
                    </CustomText>
                </Pressable>
            </View>

            <RecommendedList />
            <BreakerText text={'WHAT\'S ON YOUR MIND?'}/>
            <RegularFoodList/>
            <BreakerText text={'ALL RESTAURANTS'}/>
        </View>
    );
}

export default ExploreList;
