import {Modal, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';
import {Fonts, screenHeight} from '@unistyles/Constants.tsx';
import {BlurView} from '@react-native-community/blur';
import Icon from '@components/global/Icon.tsx';
import {CustomModalHandle} from '../../types';

function CustomModal(props: any, ref: ForwardedRef<CustomModalHandle>) {
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState(null);

    useImperativeHandle(ref, () => ({
        openModal: (data: any) => {
            setContent(data);
            setVisible(true);
        },
        closeModal: () => {
            setVisible(false);
        },
    }));

    return (
        <Modal transparent={true} visible={visible} animationType={'slide'} onRequestClose={() => setVisible(false)}>
            {Platform.OS === 'ios' && <BlurView style={styles.absolute} blurType={'light'} blurAmount={10} />}
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.closeIcon} onPress={() => setVisible(false)}>
                        <Icon size={24} name={'close'} iconFamily={'Ionicons'} color={'white'} />
                    </TouchableOpacity>
                    {content ? <View style={styles.modelContent}>{content}</View> : <Text style={styles.placeholderText}>No content provided</Text>}
                </View>
            </View>
        </Modal>
    );
}

export default forwardRef(CustomModal);

const styles = StyleSheet.create({
    modelContent: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        maxHeight: screenHeight * 0.7,
        minHeight: 150,
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        filter: Platform.OS === 'android' ? [{blur: 4}] : undefined,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        width: '100%',
        maxHeight: screenHeight * 0.7,
        minHeight: 150,
        borderRadius: 10,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#666',
        fontFamily: Fonts.Medium,
    },
    closeIcon: {
        position: 'absolute',
        top: -60,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 200,
        padding: 10,
        zIndex: 1,
    },
    absolute: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});
