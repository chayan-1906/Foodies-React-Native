import '@/unistyles/unistyles';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from "@/states/store";
import Navigation from "@/navigation/Navigation";

function App() {
    console.log('App loaded');

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigation/>
            </PersistGate>
        </Provider>
    );
}

export default App;
