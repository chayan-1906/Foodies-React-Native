import {Animated, TouchableOpacity} from 'react-native';
import {ScalePressProps} from '@/types';

function ScalePress({onPress, onLongPress, children, style}: ScalePressProps) {
    const scaleValue = new Animated.Value(1);

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} onPressIn={onPressIn} onPressOut={onPressOut} activeOpacity={1} style={{...style}}>
            <Animated.View style={{transform: [{scale: scaleValue}], width: '100%'}}>{children}</Animated.View>
        </TouchableOpacity>
    );
}

export default ScalePress;
