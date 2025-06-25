import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowButtonProps} from '../../types';
import {Colors} from '@unistyles/Constants.tsx';
import CustomText from '@components/global/CustomText.tsx';
import Icon from '@components/global/Icon.tsx';
import {RFValue} from 'react-native-responsive-fontsize';

function ArrowButton({title, onPress, price, isLoading}: ArrowButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} disabled={isLoading} onPress={onPress} style={[styles.btn, {justifyContent: price !== 0 ? 'space-between' : 'center'}]}>
            {price !== 0 && price && (
                <View>
                    <CustomText variant={'h6'} style={{color: 'white'}} fontFamily={'Okra-Bold'}>
                        ₹ {price + 34}.0
                    </CustomText>
                    <CustomText fontSize={9} style={{color: 'white'}} fontFamily={'Okra-Medium'}>
                        TOTAL
                    </CustomText>
                </View>
            )}

            <View style={styles.flexRow}>
                <CustomText fontSize={12} style={{color: '#FFF', top: -1}} fontFamily={'Okra-Bold'}>
                    {title}
                </CustomText>
                {isLoading ? <ActivityIndicator size={'small'} color={'white'} style={{marginHorizontal: 5}} /> : <Icon size={RFValue(25)} name={'arrow-right'} iconFamily={'MaterialIcons'} color={'#FFF'} />}
            </View>
        </TouchableOpacity>
    );
}

export default ArrowButton;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.active,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
        marginHorizontal: 15,
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
