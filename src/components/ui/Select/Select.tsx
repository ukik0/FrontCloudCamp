import { Typography } from '@/components/ui';
import { FieldError } from 'react-hook-form';
import { ChangeEvent, forwardRef } from 'react';
import cl from './Select.module.scss';

interface Options<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    options: Options<T>[];
    label: string;
    error?: FieldError;
    onChange?: (value: T) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps<string>>(
    ({ label, options, error, onChange, ...rest }, ref) => {
        const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
            if (onChange) {
                onChange(e.target.value as string);
            }
        };

        return (
            <>
                <div className={cl.wrapper}>
                    {label && (
                        <Typography
                            variant='title-2'
                            tag='label'
                            className={cl.label}
                        >
                            {label}
                        </Typography>
                    )}

                    <select
                        ref={ref}
                        className={cl.select}
                        onChange={onChangeHandler}
                        {...rest}
                    >
                        <option value='' disabled selected>
                            Не выбрано
                        </option>
                        {options?.map((option) => (
                            <option
                                className={cl.option}
                                value={option.value}
                                key={option.value}
                            >
                                {option.content}
                            </option>
                        ))}
                    </select>

                    <Typography variant='error'>
                        {error && error.message}
                    </Typography>
                </div>
            </>
        );
    }
);
