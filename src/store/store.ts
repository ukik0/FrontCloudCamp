import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FormReducer } from '@/store/slices';
import { StatusReducer } from '@/store/slices/status';

const rootReducer = combineReducers({
    form: FormReducer,
    status: StatusReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
