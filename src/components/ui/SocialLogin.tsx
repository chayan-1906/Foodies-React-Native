import {Image, TouchableOpacity, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {phoneStyles} from '@unistyles/phoneStyles.tsx';
import Icon from '@components/global/Icon.tsx';
import {RFValue} from 'react-native-responsive-fontsize';

function SocialLogin() {
    const {styles} = useStyles(phoneStyles);

    return (
        <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.iconContainer}>
                <Image source={require('@assets/icons/google.png')} style={styles.gimg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
                <Icon size={RFValue(18)} color={'#222'} name={'logo-apple'} iconFamily={'Ionicons'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
                <Icon size={RFValue(18)} color={'#222'} name={'ellipsis-horizontal-sharp'} iconFamily={'Ionicons'} />
            </TouchableOpacity>
        </View>
    );
}

export default SocialLogin;
