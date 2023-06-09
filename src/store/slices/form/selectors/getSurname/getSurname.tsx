import { RootState } from '@/store';

export const getSurname = (state: RootState) => state.form.surname || '';
