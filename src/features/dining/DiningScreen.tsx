import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@unistyles/emptyStyles.tsx';
import {Image, View} from 'react-native';

function DiningScreen() {
    const {styles} = useStyles(emptyStyles);

    return (
        <View style={styles.container(false)}>
            <Image source={require('@assets/images/coming_soon2.jpg')} style={styles.emptyImage} />
        </View>
    );
}

export default DiningScreen;
