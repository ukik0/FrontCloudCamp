import { RootState } from '@/store';

export const getCurrentStep = (state: RootState) =>
    state.status.currentStep || 1;
