import { ReactNode } from 'react';
import { clsx } from '@/utils/helpers';
import cl from './Button.module.scss';

type ButtonVariants = 'contained' | 'outlined' | 'icon';

interface ButtonProps extends ReactTagProps<'button'> {
    children?: ReactNode;
    variant?: ButtonVariants;
    className?: string;
    disabled?: boolean;
    icon?: string;
}

export const Button = ({
    children,
    variant = 'contained',
    className,
    disabled = false,
    type,
    icon,
    ...rest
}: ButtonProps) => {
    return (
        <button
            className={clsx({
                cls: cl.button,
                mods: { [cl.disabled]: disabled },
                additional: [cl[variant], ...(className ? [className] : '')]
            })}
            disabled={disabled}
            type={type}
            {...rest}
        >
            {children && children}
            {icon && <img src={icon} alt='icon' />}
        </button>
    );
};
