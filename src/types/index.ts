import {TextStyle, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

import React from 'react';

/** redux props */
export interface UserState {
    user: any;
    isVegMode: boolean;
}


/** component props */
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

export interface RollingBarProps {
    interval: number;
    defaultStyle: boolean;
    children: React.ReactNode;
}

export interface BackToTopButtonProps {
    onPress: () => void;
}

export interface SortingFiltersProps {
    menuTitle: string;
    options: Record<string, any>;
}

export interface CustomGradientProps {
    position: 'top' | 'bottom';
    mode?: 'dark' | 'light';
    style?: ViewStyle;
}

export type RecommendedItem = {
    id: number;
    name: string;
    imageUrl: string;
    discount?: string;
    discountAmount?: string;
    time?: string;
    distance?: string;
    rating?: number;
};

export type RestaurantItem = {
    id: number;
    name: string;
    imageUrl: string;
    discount?: string;
    discountAmount?: string;
    time?: string;
    distance?: string;
    rating?: number;
}

export interface CustomSafeAreaViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export interface RestaurantHeaderProps {
    title: string;
}

export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isCustomizable: boolean;
    isVeg: boolean;
    customizationOptions?: {
        type: string;
        options: {
            name: string;
            price: number;
        }[];
    }[];
}

export type CustomModalHandle = {
    openModal: (data: any) => void;
    closeModal: () => void;
};

export interface AddFoodModalProps {
    food: FoodItem;
    restaurant: RestaurantItem;
    onClose: () => void;
}

export interface RepeatFoodModalProps {
    food: FoodItem;
    restaurant: RestaurantItem;
    onClose: () => void;
}

export interface RemoveFoodModalProps {
    food: FoodItem;
    restaurant: RestaurantItem;
    onClose: () => void;
}
