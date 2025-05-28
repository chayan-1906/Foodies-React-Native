import {View} from 'react-native';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles.tsx';
import LottieView from 'lottie-react-native';

function Graphics() {
    const {styles} = useStyles(homeStyles);

    return (
        <View style={styles.lottieContainer} pointerEvents={'none'}>
            <LottieView enableMergePathsAndroidForKitKatAndAbove={true} enableSafeModeAndroid={true} style={styles.lottie} autoPlay={true} loop={true} hardwareAccelerationAndroid={true} source={require('@assets/animations/event.json')} />
        </View>
    );
}

export default Graphics;
