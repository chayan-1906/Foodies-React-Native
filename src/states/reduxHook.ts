import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
