import {TouchableOpacity} from 'react-native';
import {Fonts} from '@unistyles/Constants.tsx';
import {BackToTopButtonProps} from '../../types';
import Icon from '@components/global/Icon.tsx';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText.tsx';

function BackToTopButton({onPress}: BackToTopButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Icon size={RFValue(12)} name={'arrow-up-circle-outline'} iconFamily={'Ionicons'} color={'#FFF'} />
            <CustomText variant={'h6'} style={{color: '#FFF'}} fontFamily={Fonts.Bold}>
                Back to top
            </CustomText>
        </TouchableOpacity>
    );
}

export default BackToTopButton;
