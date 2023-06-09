import { RootState } from '@/store';

export const getAdvantages = (state: RootState) => state.form.advantages || [];
