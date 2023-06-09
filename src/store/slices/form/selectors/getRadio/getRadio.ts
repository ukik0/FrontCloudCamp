import { RootState } from '@/store';

export const getRadio = (state: RootState) => state.form.radio || undefined;
