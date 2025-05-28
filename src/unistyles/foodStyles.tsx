import { RFValue } from "react-native-responsive-fontsize";
import { createStyleSheet } from "react-native-unistyles";

export const foodStyles = createStyleSheet(({ device, colors, border }) => ({
    container: {
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: "space-between",
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 5
    },
    vegIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginBottom: 10
    },
    animatedCount: {
        fontSize: RFValue(16),
        color: 'white',
        fontFamily: 'Okra-Bold',
        margin: 0,
    },
    lowOpacity: {
        opacity: 0.5,
        marginTop: 2,
        marginBottom: 10
    },
    infoContainer: {
        width: '57%',
        overflow: 'hidden'
    },
    imageContainer: {
        width: "40%"
    },
    addToCollectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 5,
        alignSelf: 'flex-start',
        marginTop: 20
    },
    image: {
        width: "100%",
        height: 130,
        borderRadius: 15
    },
    foodImage: {
        width: "100%",
        height: '100%',
        resizeMode: "cover",
        borderRadius: 15
    },

    customizeText: {
        textAlign: 'center',
        opacity: 0.6,
        marginTop: 5,
        bottom: -10,
    },
    addButtonContainer: (isAdded: boolean) => ({
        width: 120,
        borderWidth: 0.7,
        borderRadius: 10,
        bottom: -12,
        position: "absolute",
        justifyContent: 'center',
        alignSelf: 'center',
        height: 40,
        borderColor: colors.primary,
        backgroundColor: isAdded ? colors.primary : '#FFF5F6',
    }),
    noSelectionContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusSmallIcon: {
        position: "absolute",
        top: -1,
        right: 8
    },
    selectedContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    }
}))