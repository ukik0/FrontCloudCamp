import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icons } from '@/components';
import { Button, Field, Modal, Stack, Typography } from '@/components/ui';
import {
    FormActions,
    getCurrentStep,
    getFormState,
    getMessage,
    StatusActions
} from '@/store/slices';
import { AboutFormField, AboutSchema, ROUTES } from '@/utils/constants';
import { useTypedSelector } from '@/utils/hooks';
import { api } from '@/utils/api';
import { clsx } from '@/utils/helpers';
import cl from './AboutStep.module.scss';

const INITIAL_STEP = 1;

export const AboutStep = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [active, setActive] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const state = useTypedSelector(getFormState);
    const currentStep = useTypedSelector(getCurrentStep);
    const message = useTypedSelector(getMessage);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid, isSubmitting },
        watch
    } = useForm<AboutFormField>({
        mode: 'all',
        resolver: yupResolver(AboutSchema),
        defaultValues: {
            field: message
        }
    });

    const charsLength = watch('field').replace(/\s/g, '').length;

    const onSubmitHandler: SubmitHandler<AboutFormField> = async (data) => {
        const message = data.field.replace(/\s+/g, ' ');

        dispatch(FormActions.setAbout(message));

        if (isValid) {
            const response = await fetch(api, {
                method: 'POST',
                body: JSON.stringify({ ...state, about: message }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                setIsSuccess(false);
                setActive(true);
                return;
            }

            setIsSuccess(true);
            setActive(true);
        }
    };

    const handleButtonClick = useCallback(() => {
        if (!isSuccess) {
            setActive(false);
            return;
        }

        dispatch(StatusActions.setCurrentStep(INITIAL_STEP));
        return navigate(ROUTES.ROOT);
    }, [dispatch, isSuccess, navigate]);

    const prevStepHandler = useCallback(() => {
        dispatch(StatusActions.setCurrentStep(currentStep - 1));
    }, [currentStep]);

    useEffect(() => {
        return () => {
            const { field } = getValues();

            dispatch(FormActions.setAbout(field));
        };
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Stack.V gap='8' align='start' className={cl.fields}>
                    <Typography variant='title-2'>About</Typography>
                    <Field
                        tag='textarea'
                        placeholder='Placeholder'
                        className={cl.field}
                        {...register('field')}
                        error={errors.field}
                        id='field-about'
                    />

                    <Typography
                        variant='title-2'
                        tag='span'
                        className={clsx({
                            cls: cl.chars,
                            mods: { [cl.error]: charsLength > 200 }
                        })}
                    >
                        {charsLength}
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
                        id='button-send'
                    >
                        Отправить
                    </Button>
                </Stack.H>
            </form>

            <Modal active={active} setActive={setActive}>
                <Stack.V gap='32' fill>
                    <Stack.H fill={true} gap='32' justify='between'>
                        <Typography variant='title-2'>
                            {isSuccess ? 'Форма успешно отправлена' : 'Ошибка'}
                        </Typography>

                        <Button
                            icon={Icons.Close}
                            variant='icon'
                            className={cl.close}
                            onClick={() => setActive(false)}
                        />
                    </Stack.H>

                    <Stack.H>
                        <div
                            className={clsx({
                                cls: cl.icon,
                                mods: { [cl.failed]: !isSuccess }
                            })}
                        >
                            <img
                                src={isSuccess ? Icons.Success : Icons.Failed}
                                alt='icon'
                            />
                        </div>
                    </Stack.H>

                    <Stack.H>
                        {isSuccess ? (
                            <Button
                                onClick={handleButtonClick}
                                variant='contained'
                                id='button-to-main'
                            >
                                На главную
                            </Button>
                        ) : (
                            <Button
                                onClick={handleButtonClick}
                                variant='contained'
                                id='button-close'
                            >
                                Закрыть
                            </Button>
                        )}
                    </Stack.H>
                </Stack.V>
            </Modal>
        </>
    );
};
