import { useCallback, useEffect } from 'react';
import {
    Controller,
    SubmitHandler,
    useController,
    useFieldArray,
    useForm
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import {
    FormActions,
    getAdvantages,
    getCheckbox,
    getCurrentStep,
    getRadio,
    StatusActions
} from '@/store/slices';
import { Button, Field, Stack, Typography } from '@/components/ui';
import { Icons } from '@/components';
import { AdvantagesFormFields, AdvantagesSchema } from '@/utils/constants';
import { useTypedSelector } from '@/utils/hooks';
import cl from './AdvantagesStep.module.scss';

export const AdvantagesStep = () => {
    const dispatch = useDispatch();

    const currentStep = useTypedSelector(getCurrentStep);
    const advantages = useTypedSelector(getAdvantages);
    const checkbox = useTypedSelector(getCheckbox);
    const radio = useTypedSelector(getRadio);

    const {
        register,
        handleSubmit,
        control,
        getValues,
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

    const onSubmitHandler: SubmitHandler<AdvantagesFormFields> = () => {
        if (isValid) {
            dispatch(StatusActions.setCurrentStep(currentStep + 1));
        }
    };

    const {
        field: { onChange, value }
    } = useController({
        control,
        name: 'checkbox',
        defaultValue: []
    });

    const {
        field: { onChange: onChangeRadio, value: radioValue }
    } = useController({
        control,
        name: 'radio',
        defaultValue: undefined
    });

    const handleRemoveField = useCallback(
        (index: number) => {
            remove(index);
        },
        [remove]
    );

    const handleChangeCheckboxField = useCallback(
        (currentValue: number) => {
            if (!value.includes(currentValue))
                return onChange([...value, currentValue]);

            return onChange(value.filter((item) => item !== currentValue));
        },
        [onChange, value]
    );

    const handleChangeRadioField = useCallback(
        (value: number) => {
            onChangeRadio(value);
        },
        [dispatch]
    );

    const prevStepHandler = useCallback(() => {
        dispatch(StatusActions.setCurrentStep(currentStep - 1));
    }, [currentStep]);

    useEffect(() => {
        return () => {
            const { advantages, radio, checkbox } = getValues();

            dispatch(FormActions.setAdvantages(advantages));
            dispatch(FormActions.setCheckbox(checkbox));
            dispatch(FormActions.setRadio(+radio));
        };
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
                                        id={`field-advantages-${index + 1}`}
                                    />
                                    <Button
                                        onClick={() => handleRemoveField(index)}
                                        icon={Icons.Trash}
                                        variant='icon'
                                        className={cl.trash}
                                        type='submit'
                                        id={`button-remove-${index + 1}`}
                                    />
                                </Stack.H>
                            )}
                        />
                    ))}
                    <Typography variant='error'>
                        {errors.advantages && errors.advantages.message}
                    </Typography>
                    <Button
                        variant='icon'
                        icon={Icons.Cross}
                        className={cl.add}
                        onClick={() => append('')}
                        id='button add'
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
                                    id={`field-checkbox-group-option-${
                                        index + 1
                                    }`}
                                    value={index + 1}
                                    checked={value.includes(index + 1)}
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
                        {errors.checkbox && errors.checkbox.message}
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
                                    {...register('radio')}
                                    value={index + 1}
                                    checked={radioValue === index + 1}
                                    onChange={() =>
                                        handleChangeRadioField(index + 1)
                                    }
                                    id={`field-radio-group-option-${index + 1}`}
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
                        disabled={!isValid || isSubmitting}
                        onClick={prevStepHandler}
                        variant='outlined'
                        id='button-back'
                    >
                        Назад
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        type='submit'
                        variant='contained'
                        id='button-next'
                    >
                        Далее
                    </Button>
                </Stack.H>
            </Stack.V>
        </form>
    );
};
