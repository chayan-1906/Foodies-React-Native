import {TextStyle, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

import React from 'react';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';

export type PlatformType = 'android' | 'ios';

export interface CustomTextProps {
    variant?: TextVariant;
    fontFamily?: 'Okra-Bold' | 'Okra-Regular' | 'Okra-Black' | 'Okra-Light' | 'Okra-Medium';
    fontSize?: number;
    color?: string;
    style?: TextStyle | TextStyle[];
    children: React.ReactNode;
    numberOfLines?: number;
    onLayout?: (event: any) => void;
}

export interface PhoneInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface IconProps {
    color?: string;
    size: number;
    name: string;
    iconFamily: 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons';
}

export interface SharedStateContextType {
    scrollY: Animated.SharedValue<number>;
    scrollYGlobal: Animated.SharedValue<number>;
    scrollToTop: () => void;
}

export interface TabProps {
    name: string;
}

export interface TabIconProps {
    focused: boolean;
}

export interface ScalePressProps {
    onPress?: () => void;
    onLongPress?: () => void;
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}
