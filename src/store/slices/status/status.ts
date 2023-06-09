import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusSchema } from '@/store/slices/status/types';

const initialState: StatusSchema = {
    currentStep: 1
};

export const INITIAL_STEP = 1;

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        }
    }
});

export const StatusActions = statusSlice.actions;
export const StatusReducer = statusSlice.reducer;
