import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { clsx } from '@/utils/helpers';
import cl from './Anchor.module.scss';

type AnchorVariant = 'contained' | 'outlined' | 'link';

interface AnchorProps extends LinkProps {
    className?: string;
    children: ReactNode;
    variant?: AnchorVariant;
}

export const Anchor = ({
    className,
    variant = 'link',
    children,
    to,
    ...rest
}: AnchorProps) => {
    return (
        <Link
            to={to}
            className={clsx({
                cls: cl.anchor,
                additional: [cl[variant], ...(className ? [className] : '')]
            })}
            {...rest}
        >
            {children}
        </Link>
    );
};
