import { RootState } from '@/store';

export const getEmail = (state: RootState) =>
    state.form.email || 'ctaricc@mail.ru';
