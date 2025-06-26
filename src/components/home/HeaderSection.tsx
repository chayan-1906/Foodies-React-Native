import {View} from 'react-native';
import SearchBar from '@/components/home/SearchBar.tsx';
import LocationHeader from '@/components/home/LocationHeader.tsx';

function HeaderSection() {
    return (
        <View>
            <LocationHeader />
            <SearchBar />
        </View>
    );
}

export default HeaderSection;
