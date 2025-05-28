import {IconProps} from '../../types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Icon({color, size, name, iconFamily}: IconProps) {
    return (
        <>
            {iconFamily === 'Ionicons' && (
                <Ionicons name={name} size={size} color={color}/>
            )}

            {iconFamily === 'MaterialIcons' && (
                <MaterialIcons name={name} size={size} color={color}/>
            )}

            {iconFamily === 'MaterialCommunityIcons' && (
                <MaterialCommunityIcons name={name} size={size} color={color}/>
            )}
        </>
    )
}

export default Icon;
