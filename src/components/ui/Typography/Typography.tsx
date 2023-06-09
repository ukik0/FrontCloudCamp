import { ReactNode } from 'react';
import { clsx } from '@/utils/helpers';

import cl from './Typography.module.scss';

type TagTypes = keyof HTMLElementTagNameMap;
type VariantTypes = 'title-1' | 'title-2' | 'uppercase' | 'error';

interface TypographyProps {
    children: ReactNode;
    variant: VariantTypes;
    tag?: TagTypes;
    className?: string;
}

export const Typography = ({
    children,
    tag = 'div',
    variant,
    className
}: TypographyProps) => {
    const Component = tag;

    return (
        <Component
            className={clsx({
                additional: [...(className ? [className] : ''), cl[variant]]
            })}
        >
            {children}
        </Component>
    );
};
