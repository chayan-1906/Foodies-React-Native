import {View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {loginStyles} from '@unistyles/authStyles.tsx';
import CustomText from '@components/global/CustomText.tsx';
import {Fonts} from '@unistyles/Constants.tsx';

function BreakerText({text}: {text: string}) {
    const {styles} = useStyles(loginStyles);

    return (
        <View style={styles.breakerContainer}>
            <View style={styles.horizontalLine} />
            <CustomText fontSize={12} fontFamily={Fonts.Medium} style={styles.breakerText}>
                {text}
            </CustomText>
            <View style={styles.horizontalLine} />
        </View>
    );
}

export default BreakerText;
