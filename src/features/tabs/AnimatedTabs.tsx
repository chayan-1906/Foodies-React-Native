import UserBottomTab from '@/features/tabs/UserBottomTab.tsx';
import {SharedStateProvider} from '@/features/tabs/SharedContext.tsx';

function AnimatedTabs() {
    return (
        <SharedStateProvider>
            <UserBottomTab />
        </SharedStateProvider>
    );
}

export default AnimatedTabs;
