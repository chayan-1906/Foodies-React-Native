import {View} from 'react-native';
import LocationHeader from '@components/home/LocationHeader.tsx';
import SearchBar from '@components/home/SearchBar.tsx';

function HeaderSection() {
    return (
        <View>
            <LocationHeader />
            <SearchBar />
        </View>
    );
}

export default HeaderSection;
