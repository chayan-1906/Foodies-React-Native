import React, {createContext, useContext} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {ISharedStateContextType} from '@/types';

const SharedStateContext = createContext<ISharedStateContextType | undefined>(undefined);

export function SharedStateProvider({children}: {children: React.ReactNode}) {
    const scrollY = useSharedValue(0);
    const scrollYGlobal = useSharedValue(0);
    const scrollToTop = () => {
        scrollY.value = withTiming(0, {duration: 300});
        scrollYGlobal.value = withTiming(0, {duration: 300});
    };

    return <SharedStateContext value={{scrollY, scrollYGlobal, scrollToTop}}>{children}</SharedStateContext>;
}

export const useSharedState = () => {
    const context = useContext(SharedStateContext);

    if (context === undefined) {
        throw new Error('useSharedState must be used withing SharedStateProvider');
    }

    return context;
};
