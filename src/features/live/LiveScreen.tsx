import {Image, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@/unistyles/emptyStyles.tsx';
import ComingSoon2Image from '../../../assets/images/coming_soon2.jpg';

function LiveScreen() {
    const {styles} = useStyles(emptyStyles);

    return (
        <View style={styles.container(true)}>
            <Image source={ComingSoon2Image} style={styles.emptyImage}/>
        </View>
    );
}

export default LiveScreen;
