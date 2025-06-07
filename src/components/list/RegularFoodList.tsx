import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles.tsx';
import ScalePress from '@components/ui/ScalePress.tsx';
import {navigate} from '@utils/NavigationUtils.ts';
import screens from '@utils/screens.ts';
import CustomText from '@components/global/CustomText.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';
import CustomGradient from '@components/global/CustomGradient.tsx';

function RegularFoodList() {
    const {styles} = useStyles(cardStyles);

    const renderItem = ({item}: any) => {
        return (
            <ScalePress onPress={async () => await navigate(screens.restaurantsScreen, {item})}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item?.imageUrl}} style={styles.itemImage} />
                    {item?.discount && (
                        <View style={styles.discountContainer}>
                            <CustomText color={Colors.background} fontSize={10} fontFamily={Fonts.Bold}>
                                {item?.discount}
                            </CustomText>
                            {item?.discountAmount && (
                                <CustomText style={{lineHeight: 11}} color={Colors.background} fontSize={9} fontFamily={Fonts.Medium}>{item?.discountAmount}</CustomText>
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.bookmarkIcon}>
                        <Image source={require('@assets/icons/bookmark.png')} style={styles.bookmarkIconImage}/>
                    </TouchableOpacity>

                    <CustomGradient position={'bottom'}/>
                </View>
            </ScalePress>
        );
    };

    return (
        <View>
            <Text>RegularFoodList</Text>
        </View>
    );
}

export default RegularFoodList;
