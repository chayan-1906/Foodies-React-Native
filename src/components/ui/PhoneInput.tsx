import {Pressable, TextInput, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {PhoneInputProps} from '../../types';
import {phoneStyles} from '@unistyles/phoneStyles.tsx';
import CustomText from '@components/global/CustomText.tsx';
import Icon from '@components/global/Icon.tsx';
import {Colors, Fonts} from '@unistyles/Constants.tsx';

function PhoneInput({value, onChangeText, onBlur, onFocus}: PhoneInputProps) {
    const {styles} = useStyles(phoneStyles);

    return (
        <View style={styles.container}>
            <Pressable style={styles.countryPickerContainer}>
                <CustomText variant={'h2'}>🇮🇳</CustomText>
                <Icon size={18} color={Colors.lightText} name={'caret-down-sharp'} iconFamily={'Ionicons'} />
            </Pressable>

            <View style={styles.phoneInputContainer}>
                <CustomText fontFamily={Fonts.Bold}>+91</CustomText>
                <TextInput placeholder={'Enter mobile number...'} keyboardType={'phone-pad'} value={value} placeholderTextColor={Colors.lightText} onChangeText={onChangeText} onFocus={onFocus} onBlur={onBlur} style={styles.input} />
            </View>
        </View>
    );
}

export default PhoneInput;
