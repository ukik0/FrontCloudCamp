import { RootState } from '@/store';

export const getNickname = (state: RootState) => state.form.nickname || '';
