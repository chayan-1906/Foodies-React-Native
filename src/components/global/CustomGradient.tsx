import {ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomGradientProps} from '@/types';

const darkColors = ['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0)'];
const lightColors = ['rgba(255,255,255,1)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.1)'];

function CustomGradient({position = 'top', mode = 'dark', style}: CustomGradientProps) {
    const bottomColors = [...(mode === 'dark' ? darkColors : lightColors)].reverse();

    const gradientStyles: ViewStyle = {
        position: 'absolute',
        width: '100%',
        height: 60,
        top: position === 'top' ? 0 : undefined,
        bottom: position === 'bottom' ? 0 : undefined,
        zIndex: 1,
    };

    return <LinearGradient colors={position === 'top' ? lightColors : bottomColors} style={[gradientStyles, style]}/>;
}

export default CustomGradient;
