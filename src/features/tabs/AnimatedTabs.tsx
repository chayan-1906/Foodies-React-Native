import {SharedStateProvider} from '@features/tabs/SharedContext.tsx';
import UserBottomTab from '@features/tabs/UserBottomTab.tsx';

function AnimatedTabs() {
    return (
        <SharedStateProvider>
            <UserBottomTab />
        </SharedStateProvider>
    );
}

export default AnimatedTabs;
