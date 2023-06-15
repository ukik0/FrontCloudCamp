import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Field, Select, Stack } from '@/components/ui';
import { InfoFormFields, InfoSchema, Options, ROUTES } from '@/utils/constants';
import {
    FormActions,
    getCurrentStep,
    getName,
    getNickname,
    getSex,
    getSurname,
    StatusActions
} from '@/store/slices';
import { useTypedSelector } from '@/utils/hooks';
import cl from './InfoStep.module.scss';

export const InfoStep = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentStep = useTypedSelector(getCurrentStep);
    const name = useTypedSelector(getName);
    const nickname = useTypedSelector(getNickname);
    const surname = useTypedSelector(getSurname);
    const sex = useTypedSelector(getSex);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting }
    } = useForm<InfoFormFields>({
        mode: 'onChange',
        resolver: yupResolver(InfoSchema),
        defaultValues: {
            sex,
            name,
            surname,
            nickname
        }
    });

    const onSubmitHandler: SubmitHandler<InfoFormFields> = (data) => {
        if (isValid) {
            dispatch(FormActions.setName(data.name));
            dispatch(FormActions.setNickname(data.nickname));
            dispatch(FormActions.setSurname(data.surname));
            dispatch(FormActions.setSex(data.sex));
            dispatch(StatusActions.setCurrentStep(currentStep + 1));
        }
    };

    const handleBackClick = useCallback(() => {
        navigate(ROUTES.ROOT);
    }, [navigate]);

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack.V gap='24' className={cl.fields} align='start'>
                <Field
                    label='Nickname'
                    placeholder='Nickname'
                    id='field-nickname'
                    {...register('nickname')}
                    error={errors.nickname}
                />
                <Field
                    label='Name'
                    placeholder='Name'
                    id='field-name'
                    {...register('name')}
                    error={errors.name}
                />
                <Field
                    label='Surname'
                    placeholder='Surname'
                    id='field-surname'
                    {...register('surname')}
                    error={errors.surname}
                />
                <Controller
                    render={({ field }) => (
                        <Select
                            label='Sex'
                            options={Options}
                            error={errors.sex}
                            id='field-sex'
                            {...register('sex')}
                            {...field}
                        />
                    )}
                    name='sex'
                    control={control}
                ></Controller>
            </Stack.V>

            <Stack.H justify='between' gap='16'>
                <Button
                    disabled={!isValid || isSubmitting}
                    onClick={handleBackClick}
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
        </form>
    );
};
