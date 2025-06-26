import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Colors} from '@/unistyles/Constants.tsx';
import {CustomSafeAreaViewProps} from '@/types';

function CustomSafeAreaView({children, style}: CustomSafeAreaViewProps) {
    return (
        <View style={[styles.container, style]}>
            <SafeAreaView />
            {children}
        </View>
    );
}

export default CustomSafeAreaView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
