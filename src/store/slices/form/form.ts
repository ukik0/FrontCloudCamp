import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchema } from './types';

const initialState: FormSchema = {
    nickname: null,
    name: null,
    surname: null,
    phone: null,
    email: null,
    sex: 'man',
    about: '',
    radio: 1,
    advantages: ['Value', 'Value', 'Value'],
    checkbox: []
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setSurname: (state, action: PayloadAction<string>) => {
            state.surname = action.payload;
        },
        setSex: (state, action: PayloadAction<'woman' | 'man'>) => {
            state.sex = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setAdvantages: (state, action: PayloadAction<string[]>) => {
            state.advantages = action.payload;
        },
        setCheckbox: (state, action: PayloadAction<number>) => {
            const copy = state.checkbox.filter(
                (item) => item !== action.payload
            );

            if (copy.length !== state.checkbox.length) {
                state.checkbox = copy;
            } else {
                copy.push(action.payload);
                state.checkbox = copy;
            }
        },
        setRadio: (state, action: PayloadAction<number>) => {
            state.radio = action.payload;
        },
        setAbout: (state, action: PayloadAction<string>) => {
            state.about = action.payload;
        }
    }
});

export const FormActions = formSlice.actions;
export const FormReducer = formSlice.reducer;
