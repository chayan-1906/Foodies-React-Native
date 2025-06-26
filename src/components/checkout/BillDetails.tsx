import {StyleSheet, View} from 'react-native';
import {Colors} from '@/unistyles/Constants.tsx';
import CustomText from '@/components/global/CustomText.tsx';
import ReportItem from '@/components/checkout/ReportItem.tsx';

function BillDetails({totalItemPrice}: {totalItemPrice: number}) {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text} fontFamily={'Okra-Bold'}>
                Bill Details
            </CustomText>
            <View style={styles.billContainer}>
                <ReportItem iconName={'article'} title={'Items Total'} price={totalItemPrice} styles={styles} />
                <ReportItem iconName={'pedal-bike'} title={'Delivery Charge'} price={29} styles={styles} />
                <ReportItem iconName={'shopping-bag'} title={'Handling Charge'} price={2} styles={styles} />
                <ReportItem iconName={'cloudy-snowing'} title={'Surge Charge'} price={3} styles={styles} />
            </View>
            <View style={[{marginBottom: 15}, styles.flexRowBetween]}>
                <CustomText variant={'h7'} style={styles.text} fontFamily={'Okra-Bold'}>
                    Grand Total
                </CustomText>
                <CustomText style={styles.text} fontFamily={'Okra-Bold'}>₹{totalItemPrice + 34}</CustomText>
            </View>
        </View>
    );
}

export default BillDetails;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        backgroundColor: '#FFF',
        borderRadius: 15,
    },
    text: {
        marginHorizontal: 10,
        marginTop: 15,
    },
    billContainer: {
        padding: 10,
        paddingBottom: 0,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.7,
    },
    flexRowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRow: {
        gap: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
});
