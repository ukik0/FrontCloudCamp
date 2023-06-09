import { useLayoutEffect } from 'react';

export const useLockBody = ({ active = false }: { active: boolean }) => {
    useLayoutEffect((): (() => void) => {
        const originalStyle: string = window.getComputedStyle(
            document.body
        ).overflow;

        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => (document.body.style.overflow = originalStyle);
    }, [active]);
};
