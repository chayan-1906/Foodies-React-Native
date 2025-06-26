import {Image, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@/unistyles/emptyStyles.tsx';
import ComingSoon3Image from '@/assets/images/coming_soon3.png';

function ReorderScreen() {
    const {styles} = useStyles(emptyStyles);

    return (
        <View style={styles.container(false)}>
            <Image source={ComingSoon3Image} style={styles.emptyImage}/>
        </View>
    );
}

export default ReorderScreen;
