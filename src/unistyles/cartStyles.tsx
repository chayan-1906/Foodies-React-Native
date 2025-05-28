import { createStyleSheet } from 'react-native-unistyles';
import { screenHeight, screenWidth } from './Constants';

export const cartStyles = createStyleSheet(({ device, colors, border }) => ({
    cartContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.background,
        alignItems: 'center',
        paddingVertical: 10
    },
    expandedCartContainer: {
        justifyContent: 'flex-end',
        paddingVertical: 10
    },
    moreButton: {
        backgroundColor: colors.background,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 2,
        zIndex: 100,
        position: 'absolute',
        top: -15,
        borderColor: colors.border,
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        elevation: 5,
        shadowRadius: 5,
        shadowColor: colors.lightText,
    },
    cartItemContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        marginBottom: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.border,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        elevation: 5,
        shadowRadius: 1.5,
        shadowColor: colors.lightText,
        backgroundColor: colors.background,
        width: "96%",
        alignSelf: 'center'
    },
    flexRowGap: {
        alignItems: 'center',
        flexDirection: "row",
        gap: 10
    },
    closeButton: {
        opacity: 0.6,
        marginHorizontal: 10
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: "row",
        marginTop: 2
    },
    cartButton: {
        backgroundColor: colors.active,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    contentContainer: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: -2,
        bottom: -40,
        position: 'absolute',
    },
    closeIcon: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 200,
        padding: 5,
        marginBottom: 10
    },
    absolute: {
        position: 'absolute',
        width: screenWidth,
        height: screenHeight,
        zIndex: -2,
    },
    scrollContainer: {
        maxHeight: screenHeight * 0.7,
        backgroundColor: '#F4F6FC',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5,
    },
    flexRowBetween: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15
    }
}));
