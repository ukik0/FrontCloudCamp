import { Button, Field, Stack, Typography } from '@/components/ui';
import { Icons } from '@/components';
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm
} from 'react-hook-form';
import { AdvantagesFormFields, AdvantagesSchema } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import {
    FormActions,
    getAdvantages,
    getCheckbox,
    getRadio
} from '@/store/slices';
import { useTypedSelector } from '@/utils/hooks';
import { useEffect } from 'react';
import cl from './AdvantagesStep.module.scss';

interface AdvantagesStepProps {
    next: () => void;
    prev: () => void;
}

export const AdvantagesStep = ({ next, prev }: AdvantagesStepProps) => {
    const dispatch = useDispatch();
    const advantages = useTypedSelector(getAdvantages);
    const checkbox = useTypedSelector(getCheckbox);
    const radio = useTypedSelector(getRadio);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting }
    } = useForm<AdvantagesFormFields>({
        mode: 'all',
        resolver: yupResolver(AdvantagesSchema),
        defaultValues: {
            advantages,
            checkbox,
            radio
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: 'advantages' as never,
        control
    });

    const onSubmitHandler: SubmitHandler<AdvantagesFormFields> = (data) => {
        if (isValid) {
            dispatch(FormActions.setAdvantages(data.advantages));
            dispatch(FormActions.setRadio(data.radio));
            next();
        }
    };

    const handleRemoveField = (index: number) => {
        if (index === 0) return;

        remove(index);
    };

    const handleChangeCheckboxField = (value: number) => {
        dispatch(FormActions.setCheckbox(value));
    };

    const handleChangeRadioField = (value: number) => {
        dispatch(FormActions.setRadio(value));
    };

    useEffect(() => {
        append('');
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack.V gap='24' align='start'>
                <Stack.V gap='8' align='start' fill>
                    <Typography variant='title-2'>Advantages</Typography>
                    {fields.map((fieldstate, index) => (
                        <Controller
                            key={fieldstate.id}
                            control={control}
                            name={`advantages.${index}` as const}
                            render={({ field }) => (
                                <Stack.H
                                    gap='16'
                                    fill
                                    key={fieldstate.id}
                                    align='start'
                                    className={cl.wrapper}
                                >
                                    <Field
                                        {...field}
                                        placeholder='Placeholder'
                                        error={errors.advantages?.[index]}
                                        className={cl.field}
                                    />
                                    {index > 0 && (
                                        <Button
                                            onClick={() =>
                                                handleRemoveField(index)
                                            }
                                            icon={Icons.Trash}
                                            variant='icon'
                                            className={cl.trash}
                                        />
                                    )}
                                </Stack.H>
                            )}
                        />
                    ))}
                    <Button
                        variant='icon'
                        icon={Icons.Cross}
                        className={cl.add}
                        onClick={() => append('')}
                    />
                </Stack.V>

                <Stack.V gap='8' align='start'>
                    <Typography variant='title-2'>Checkbox group</Typography>
                    {Array.from({ length: 3 })
                        .fill(0)
                        .map((_, index) => (
                            <Stack.H key={index} gap='8' fill={false}>
                                <Field
                                    type='checkbox'
                                    {...register('checkbox')}
                                    value={index + 1}
                                    checked={checkbox.some(
                                        (value) => value === index + 1
                                    )}
                                    onChange={() =>
                                        handleChangeCheckboxField(index + 1)
                                    }
                                />
                                <Typography variant='title-2'>
                                    {index + 1}
                                </Typography>
                            </Stack.H>
                        ))}
                    <Typography variant='error'>
                        {checkbox.length === 0 && errors.checkbox?.message}
                    </Typography>
                </Stack.V>

                <Stack.V gap='8' align='start'>
                    <Typography variant='title-2'>Radio group</Typography>
                    {Array.from({ length: 3 })
                        .fill(0)
                        .map((_, index) => (
                            <Stack.H key={index} gap='8'>
                                <Field
                                    type='radio'
                                    value={index + 1}
                                    {...register('radio')}
                                    checked={radio == index + 1}
                                    onChange={() =>
                                        handleChangeRadioField(index + 1)
                                    }
                                />
                                <Typography variant='title-2'>
                                    {index + 1}
                                </Typography>
                            </Stack.H>
                        ))}

                    <Typography variant='error'>
                        {errors.radio && errors.radio.message}
                    </Typography>
                </Stack.V>

                <Stack.H justify='between' gap='16' fill>
                    <Button
                        disabled={isSubmitting}
                        onClick={prev}
                        variant='outlined'
                    >
                        Назад
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        type='submit'
                        variant='contained'
                    >
                        Далее
                    </Button>
                </Stack.H>
            </Stack.V>
        </form>
    );
};
