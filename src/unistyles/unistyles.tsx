import {UnistylesRegistry} from 'react-native-unistyles';
import {Colors, Fonts, screenHeight, screenWidth} from './Constants';
import {RFValue} from 'react-native-responsive-fontsize';

export const RV = (number: number) => RFValue(number);

export const defaultTheme = {
    colors: Colors,
    margins: {
        sm: RV(4),
        md: RV(8),
        lg: RV(16),
        xl: RV(24),
    },
    device: {
        width: screenWidth,
        height: screenHeight,
    },
    fonts: Fonts,
    fontSize: {
        xxs: RV(10),
        xs: RV(12),
        sm: RV(14),
        md: RV(16),
        lg: RV(18),
        xl: RV(20),
        xxl: RV(24),
        xxxl: RV(28),
        base: RV(16),
    },
    border: {
        xl: 50,
        sm: 15,
        md: 10,
        xs: 10,
        lg: 12,
        full: 200,
    },
} as const;

declare module 'react-native-unistyles' {
    interface UnistylesThemes {
        default: typeof defaultTheme;
    }
}

UnistylesRegistry.addThemes({default: defaultTheme}).addConfig({adaptiveThemes: true});
