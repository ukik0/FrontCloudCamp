import { Button, Field, Modal, Stack, Typography } from '@/components/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AboutFormField, AboutSchema, ROUTES } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { clsx } from '@/utils/helpers';
import { useDispatch } from 'react-redux';
import { FormActions, getFormState, StatusActions } from '@/store/slices';
import { useState } from 'react';
import { Icons } from '@/components';
import cl from './AboutStep.module.scss';
import { useTypedSelector } from '@/utils/hooks';
import { api } from '@/utils/api';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STEP } from '@/store/slices/status/status';

interface AboutStepProps {
    prev: () => void;
}

export const AboutStep = ({ prev }: AboutStepProps) => {
    const navigate = useNavigate();

    const [active, setActive] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const state = useTypedSelector(getFormState);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch
    } = useForm<AboutFormField>({
        mode: 'all',
        resolver: yupResolver(AboutSchema),
        defaultValues: {
            field: ''
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
            }

            setIsSuccess(true);
            setActive(true);
        }
    };

    const handleButtonClick = () => {
        if (!isSuccess) {
            setActive(false);
            return;
        }

        dispatch(StatusActions.setCurrentStep(INITIAL_STEP));
        return navigate(ROUTES.ROOT);
    };

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
                        <Button onClick={handleButtonClick} variant='contained'>
                            {isSuccess ? 'На главную' : 'Закрыть'}
                        </Button>
                    </Stack.H>
                </Stack.V>
            </Modal>
        </>
    );
};
