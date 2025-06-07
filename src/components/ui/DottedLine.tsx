import {StyleSheet, View} from 'react-native';
import Svg, {Line} from 'react-native-svg';

function DottedLine() {
    return (
        <View style={styles.container}>
            <Svg height={2} width={'100%'}>
                <Line x1={0} y1={0} x2={'100%'} y2={0} stroke={'#999'} strokeWidth={2} strokeDasharray={'3,3'} />
            </Svg>
        </View>
    );
}

export default DottedLine;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 15,
    },
});
