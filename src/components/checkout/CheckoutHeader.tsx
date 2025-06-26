import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {goBack} from "@/utils/NavigationUtils.ts";
import Icon from "@/components/global/Icon.tsx";
import CustomText from "@/components/global/CustomText.tsx";
import {Colors} from "@/unistyles/Constants.tsx";

function CheckoutHeader({title}: {title: string}) {
    return (
        <SafeAreaView>
            <View style={styles.flexRow}>
                <View style={styles.flexRowGap}>
                    <Pressable onPress={goBack}>
                        <Icon size={16} name={'chevron-back'} iconFamily={'Ionicons'} />
                    </Pressable>
                    <View>
                        <CustomText fontFamily={'Okra-Bold'} fontSize={11} style={styles.text}>
                            {title}
                        </CustomText>
                        <CustomText fontFamily={'Okra-Medium'} fontSize={10} style={styles.text2}>
                            Delivering to Pochinki, Erangel
                        </CustomText>
                    </View>
                </View>

                <View style={{width: 20}}>
                    <Icon size={RFValue(16)} name={'share-outline'} iconFamily={'Ionicons'} color={Colors.primary} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default CheckoutHeader;

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'space-between',
        padding: 10,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.6,
        borderBottomColor: Colors.border,
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        textAlign: 'left',
    },
    text2: {
        textAlign: 'left',
        opacity: 0.5,
    },
});
