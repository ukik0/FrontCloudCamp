import { RootState } from '@/store';

export const getName = (state: RootState) => state.form.name || '';
