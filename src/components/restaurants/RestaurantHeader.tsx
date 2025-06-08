import {TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {restaurantHeaderStyles} from '@unistyles/restaurantStyles.tsx';
import {RestaurantHeaderProps} from '../../types';
import {goBack} from '@utils/NavigationUtils.ts';
import Icon from '@components/global/Icon.tsx';
import CustomText from '@components/global/CustomText.tsx';
import {Fonts} from '@unistyles/Constants.tsx';

function RestaurantHeader({title}: RestaurantHeaderProps) {
    const {styles} = useStyles(restaurantHeaderStyles);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.flexRowGap}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Icon size={24} name={'arrow-left'} iconFamily={'MaterialCommunityIcons'} />
                </TouchableOpacity>

                <View>
                    <CustomText fontFamily={Fonts.Medium} fontSize={9.5} style={styles.title}>
                        {title}
                    </CustomText>
                    <CustomText fontFamily={Fonts.Bold}>Recommended for you</CustomText>
                </View>
            </View>

            <TouchableOpacity onPress={() => {}}>
                <Icon size={24} name={'ellipsis-vertical-sharp'} iconFamily={'Ionicons'}/>
            </TouchableOpacity>
        </View>
    );
}

export default RestaurantHeader;
