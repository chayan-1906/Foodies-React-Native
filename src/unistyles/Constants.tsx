import {Dimensions} from 'react-native';

export const BOTTOM_TAB_HEIGHT = 90;
export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;
export const isBannerHeight = screenHeight * 0.4;

export const Colors = {
    primary: '#EF6F1E',
    primary_light: '#EF4F5F',
    text: '#222',
    active_light: '#ECFAF1',
    secondary: '#2D2D2D',
    tertiary: '#F4F4F2',
    background: '#FFF',
    background_light: '#F4F6FC',
    border: '#E5E9EF',
    lightText: '#9197A6',
    active: '#019A51',
    dark: '#18171C',
};

export enum Fonts {
    Regular = 'Okra-Regular',
    Medium = 'Okra-Medium',
    Light = 'Okra-MediumLight',
    SemiBold = 'Okra-Bold',
    Bold = 'Okra-ExtraBold',
}

export const lightColors = ['rgba(255,255,255,1)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.003)'];

export const darkWeatherColors = ['rgba(54, 67, 92, 1)', 'rgba(54, 67, 92, 0.9)', 'rgba(54, 67, 92, 0.8)', 'rgba(54, 67, 92, 0.2)', 'rgba(54, 67, 92, 0.0)'];
