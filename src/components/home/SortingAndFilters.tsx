import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {SortingFiltersProps} from '@/types';
import {filterStyles} from '@/unistyles/filterStyles.tsx';
import Icon from '@/components/global/Icon.tsx';
import {Colors, Fonts} from '@/unistyles/Constants.tsx';
import CustomText from '@/components/global/CustomText.tsx';

function SortingAndFilters({menuTitle, options}: SortingFiltersProps) {
    const {styles} = useStyles(filterStyles);

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false} contentContainerStyle={styles.filterBar}>
            <TouchableOpacity style={styles.filterItem}>
                <View style={{transform: [{rotate: '90deg'}]}}>
                    <Icon size={16} name={'tune-vertical-variant'} iconFamily={'MaterialCommunityIcons'} color={Colors.text} />
                </View>
                <CustomText fontSize={11} fontFamily={Fonts.Medium}>
                    {menuTitle}
                </CustomText>
                <Icon size={16} name={'caret-down'} iconFamily={'Ionicons'} color={Colors.text} />
            </TouchableOpacity>
            {options?.map((i: string, index: number) => {
                return (
                    <TouchableOpacity key={index} style={styles.filterItem}>
                        <CustomText fontSize={11} fontFamily={Fonts.Medium}>
                            {i}
                        </CustomText>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

export default SortingAndFilters;
