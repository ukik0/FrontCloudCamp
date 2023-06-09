import { RootState } from '@/store';

export const getCheckbox = (state: RootState) => state.form.checkbox || [];
