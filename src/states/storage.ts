import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';

const storage = new MMKV();
export const token_storage = new MMKV({
    id: 'user_storage',
    encryptionKey: 'RSA KEY',
});

const reduxStorage: Storage = {
    setItem(key: string, value: string) {
        storage.set(key, value);
        return Promise.resolve(true);
    },
    getItem(key: string) {
        const value = storage.getString(key);
        return Promise.resolve(value);
    },
    removeItem(key: string) {
        storage.delete(key);
        return Promise.resolve();
    },
};

export default reduxStorage;
