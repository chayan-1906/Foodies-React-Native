import {View} from 'react-native';
import {ReportItemProps} from '@/types';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from '@/components/global/Icon.tsx';
import {Colors} from '@/unistyles/Constants.tsx';
import CustomText from '@/components/global/CustomText.tsx';

const ReportItem = ({iconName, underline, title, price, styles}: ReportItemProps) => {
    return (
        <View style={[styles.flexRowBetween, {marginBottom: 10}]}>
            <View style={styles.flexRow}>
                <Icon size={RFValue(12)} name={iconName} iconFamily={'MaterialIcons'} color={Colors.lightText} />
                <CustomText style={{textDecorationLine: underline ? 'underline' : 'none'}} variant={'h6'}>{title}</CustomText>
            </View>
            <CustomText variant={'h6'}>₹{price}</CustomText>
        </View>
    );
};

export default ReportItem;
