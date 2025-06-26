import {Platform, StyleSheet, Text, View} from 'react-native';
import {CustomTextProps, PlatformType, TextVariant} from '@/types';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '@/unistyles/Constants.tsx';

const fontSizeMap: Record<TextVariant, Record<PlatformType, number>> = {
    h1: {android: 24, ios: 22},
    h2: {android: 22, ios: 20},
    h3: {android: 20, ios: 18},
    h4: {android: 18, ios: 16},
    h5: {android: 16, ios: 14},
    h6: {android: 12, ios: 10},
    h7: {android: 10, ios: 9},
};

function CustomText({variant, fontFamily, fontSize, color, style, children, numberOfLines, onLayout, ...props}: CustomTextProps) {
    let computedFontSize: number = Platform.OS === 'android' ? RFValue(fontSize || 12) : RFValue(fontSize || 10);

    if (variant && fontSizeMap[variant]) {
        const defaultSize = fontSizeMap[variant][Platform.OS as PlatformType];
        computedFontSize = RFValue(fontSize || defaultSize);
    }

    const fontFamilyStyle = {fontFamily};

    return (
        <View>
            <Text numberOfLines={numberOfLines} onLayout={onLayout} style={[styles.text, {color: color || Colors.text, fontSize: computedFontSize}, fontFamilyStyle, style]} {...props}>
                {children}
            </Text>
        </View>
    );
}

export default CustomText;

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
    },
});
