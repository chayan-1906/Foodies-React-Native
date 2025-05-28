import {Image, View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {emptyStyles} from '@unistyles/emptyStyles.tsx';

function LiveScreen() {
    const {styles} = useStyles(emptyStyles);

    return (
        <View style={styles.container(false)}>
            <Image source={require('@assets/images/coming_soon.jpg')} style={styles.emptyImage} />
        </View>
    );
}

export default LiveScreen;
