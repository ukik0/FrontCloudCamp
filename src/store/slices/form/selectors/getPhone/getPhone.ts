import { RootState } from '@/store';

export const getPhone = (state: RootState) => state.form.phone || '';
