import {TextStyle, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

import React from 'react';

/** navigation types */
export interface INavigationParams {
    restaurantDetailsScreen: { restaurant: IRestaurantItem };
    checkoutScreen: { restaurant: IRestaurantItem };
    orderSuccessScreen: undefined;
}

/** tab bar types */
export interface ITabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

/** event types */
export interface ILayoutEvent {
    nativeEvent: {
        layout: {
            width: number;
            height: number;
            x: number;
            y: number;
        };
    };
}

/** modal refs */
export interface IModalRef {
    openModal: (data: IFoodItem | CartCustomization) => void;
    closeModal: () => void;
}

/** user types */
export interface IUser {
    id: string;
    name: string;
    email?: string;
    phone: string;
    avatar?: string;
}

/** redux props */
export interface IUserState {
    user: IUser | null;
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
    onLayout?: (event: ILayoutEvent) => void;
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

export interface ISharedStateContextType {
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

export interface BackToTopButtonProps {
    onPress: () => void;
}

export interface SortingFiltersProps {
    menuTitle: string;
    options: string[];
}

export interface CustomGradientProps {
    position: 'top' | 'bottom';
    mode?: 'dark' | 'light';
    style?: ViewStyle;
}

export type IRecommendedItem = {
    id: number;
    name: string;
    imageUrl: string;
    discount?: string;
    discountAmount?: string;
    time?: string;
    distance?: string;
    rating?: number;
};

export type IRestaurantItem = {
    id: number;
    name: string;
    imageUrl: string;
    discount?: string;
    discountAmount?: string;
    time?: string;
    distance?: string;
    rating?: number;
};

export interface CustomSafeAreaViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export interface RestaurantHeaderProps {
    title: string;
}

export interface IFoodItem {
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

export interface ICartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    cartPrice?: number;
    isVeg: boolean;
    isCustomizable: boolean;
    customizations?: ICartCustomization[];
}

export type CustomModalHandle<T = any> = {
    openModal: (data: T) => void;
    closeModal: () => void;
};

export interface IAddFoodModalProps {
    food: IFoodItem;
    restaurant: IRestaurantItem;
    onClose: () => void;
}

export interface IRepeatFoodModalProps {
    item: ICartItem;
    restaurant: IRestaurantItem;
    onOpenAddFoodModal: () => void;
    closeModal: () => void;
}

export interface IRemoveFoodModalProps {
    item: ICartItem;
    restaurant: IRestaurantItem;
    closeModal: () => void;
}

export interface IMiniFoodCardProps {
    item: ICartItem;
    customization: ICartCustomization;
    restaurant: IRestaurantItem;
}

export interface IEditFoodModalProps {
    item: ICustomization;
    customization: ICustomization;
    restaurant: IRestaurantItem;
    onClose: () => void;
}

export interface ICustomization extends ICartItem, IFoodItem {
    quantity: number;
    price: number;
    customizationOptions: any[];
}

/** cart customization types */
export interface ICustomizationOption {
    name: string;
    price: number;
    isSelected?: boolean;
}

interface CartCustomization extends ICustomization {
    id: string;
    quantity: number;
    cartPrice: number;
    price: number;
    customizationOptions: ICustomizationOption[];
}

interface ISelectedCustomizations {
    [key: string]: ICustomizationOption[];
}

export interface ICartCustomization {
    id: string;
    quantity: number;
    cartPrice: number;
    price: number;
    customizationOptions: ICustomizationOption[];
}

interface ICustomizationState {
    selectedOptions: ISelectedCustomizations;
    totalPrice: number;
    quantity: number;
}

export interface SearchAndOffersProps {
    restaurant: IRestaurantItem;
}

export interface ArrowButtonProps {
    title: string;
    onPress: () => void;
    price?: number;
    isLoading?: boolean;
}

export interface ReportItemProps {
    iconName: string;
    underline?: boolean;
    title: string;
    price: number;
    styles: any; // TODO: Fix any type
}
