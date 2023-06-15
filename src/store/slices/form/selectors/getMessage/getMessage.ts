import { RootState } from '@/store';

export const getMessage = (state: RootState) => state.form.about || '';
