import { forwardRef } from 'react';
import { Field, FieldProps } from '@/components/ui';

interface CheckboxProps extends Omit<FieldProps, 'onChange' | 'value'> {
    onChange: (...args: any) => void;
    value: number;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ value, checked, onChange, id, ...rest }) => {
        return (
            <Field
                type='checkbox'
                value={value + 1}
                checked={checked}
                onChange={onChange}
                id={id}
                {...rest}
            />
        );
    }
);
