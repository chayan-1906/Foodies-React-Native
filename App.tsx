import '@unistyles/unistyles.tsx';
import Navigation from '@navigation/Navigation.tsx';
import {Provider} from 'react-redux';
import {persistor, store} from '@states/store.ts';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
    console.log('App loaded');

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation />
            </PersistGate>
        </Provider>
    );
}

export default App;
