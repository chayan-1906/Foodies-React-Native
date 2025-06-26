import {StyleSheet, View} from 'react-native';
import Icon from '@/components/global/Icon.tsx';
import {Fonts} from '@/unistyles/Constants.tsx';
import CustomText from '@/components/global/CustomText.tsx';

const getRatingColor = (rating: number) => {
    if (rating >= 4) {
        return '#1C653C';
    } else if (rating >= 3) {
        return '#128145';
    } else if (rating >= 2) {
        return '#E67E22';
    } else if (rating >= 1) {
        return '#953925';
    } else {
        return '#CCC';
    }
};

function StarRating({rating}: {rating: number}) {
    const backgroundColor = getRatingColor(rating);

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <CustomText color={'#FFF'} fontSize={12} fontFamily={Fonts.Bold}>
                {rating || '-'}
            </CustomText>
            <Icon size={16} name={'star'} iconFamily={'MaterialIcons'} color={'#FFF'} />
        </View>
    );
}

export default StarRating;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        borderRadius: 10,
        gap: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
