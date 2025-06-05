import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {filterStyles} from '@unistyles/filterStyles.tsx';
import Icon from '@components/global/Icon.tsx';
import {Colors} from '@unistyles/Constants.tsx';
import CustomText from '@components/global/CustomText.tsx';
import {SortingFiltersProps} from '../../types';

function SortingAndFilters({menuTitle, options}: SortingFiltersProps) {
    const {styles} = useStyles(filterStyles);

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBar}>
            <TouchableOpacity style={styles.filterItem}>
                <View style={{transform: [{rotate: '90deg'}]}}>
                    <Icon size={16} name={'tune-vertical-variant'} iconFamily={'MaterialCommunityIcons'} color={Colors.text} />
                </View>
                <CustomText fontSize={11} fontFamily={'Okra-Medium'}>
                    {menuTitle}
                </CustomText>
                <Icon size={16} name={'caret-down'} iconFamily={'Ionicons'} color={Colors.text} />
            </TouchableOpacity>
            {options?.map((i: string, index: number) => {
                return (
                    <TouchableOpacity key={index} style={styles.filterItem}>
                        <CustomText fontSize={11} fontFamily={'Okra-Medium'}>
                            {i}
                        </CustomText>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

export default SortingAndFilters;
