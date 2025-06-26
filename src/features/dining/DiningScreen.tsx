import {Image, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@/unistyles/emptyStyles.tsx';
import ComingSoonImage from '@/assets/images/coming_soon.jpg';

function DiningScreen() {
    const {styles} = useStyles(emptyStyles);

    return (
        <View style={styles.container(false)}>
            <Image source={ComingSoonImage} style={styles.emptyImage} />
        </View>
    );
}

export default DiningScreen;
