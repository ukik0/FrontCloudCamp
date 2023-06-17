import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { Typography } from '@/components/ui';
import { clsx } from '@/utils/helpers';
import cl from './Field.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement>;

type FieldIntersection = InputProps & TextareaProps;
type TagType = 'input' | 'textarea';
type FieldVariants = 'darken' | 'fill';

interface FieldProps extends FieldIntersection {
    tag?: TagType;
    label?: string;
    variant?: FieldVariants;
    className?: string;
    children?: ReactNode;
    mask?: string | Array<string | RegExp>;
    error?: FieldError;
    fill?: boolean;
}

export const Field = forwardRef<
    HTMLInputElement & HTMLTextAreaElement,
    Omit<FieldProps, 'mask'>
>(
    (
        {
            label,
            variant,
            fill = true,
            tag = 'input',
            className,
            error,
            ...rest
        },
        ref
    ) => {
        const Component = tag;
        return (
            <div
                className={clsx({ cls: cl.wrapper, mods: { [cl.fill]: fill } })}
            >
                {label && (
                    <Typography
                        variant='title-2'
                        tag='label'
                        className={cl.label}
                    >
                        {label}
                    </Typography>
                )}

                <Component
                    ref={ref}
                    className={clsx({
                        cls: cl.field,
                        additional: [
                            ...(className ? [className] : ''),
                            cl[variant || '']
                        ]
                    })}
                    {...rest}
                />

                {error && (
                    <Typography variant='error'>{error.message}</Typography>
                )}
            </div>
        );
    }
);

interface MaskFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    tag?: TagType;
    label?: string;
    variant?: FieldVariants;
    className?: string;
    children?: ReactNode;
    mask?: string | Array<string | RegExp>;
    error?: FieldError;
    fill?: boolean;
}

export const InputMask = forwardRef<
    HTMLInputElement,
    Omit<MaskFieldProps, 'tag'>
>(({ label, fill = true, mask, error, className, variant, ...rest }, ref) => {
    return (
        <div className={clsx({ cls: cl.wrapper, mods: { [cl.fill]: fill } })}>
            {label && <label className={cl.label}>{label}</label>}

            <ReactInputMask
                inputRef={ref}
                className={clsx({
                    cls: cl.field,
                    additional: [
                        ...(className ? [className] : ''),
                        cl[variant || '']
                    ]
                })}
                mask={mask!}
                alwaysShowMask
                {...rest}
            />

            <Typography variant='error'>{error && error.message}</Typography>
        </div>
    );
});
