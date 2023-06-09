import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormActions } from '@/store/slices';
import { Profile } from '@/components';
import { Button, Field, InputMask, Stack } from '@/components/ui';
import { useTypedSelector } from '@/utils/hooks';
import {
    AuthFormFields,
    AuthSchema,
    FullName,
    Networks,
    ROUTES
} from '@/utils/constants';
import cl from './HomePage.module.scss';

const HomePage = () => {
    return (
        <>
            <Profile fullName={FullName} networks={Networks} />
            <Form />
        </>
    );
};

export default HomePage;

const Form = () => {
    const navigate = useNavigate();
    const email = useTypedSelector((state) => state.form.email) || '';
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }
    } = useForm<AuthFormFields>({
        mode: 'onChange',
        resolver: yupResolver(AuthSchema),
        defaultValues: {
            email
        }
    });

    const onSubmitHandler: SubmitHandler<AuthFormFields> = (data) => {
        if (isValid) {
            dispatch(FormActions.setEmail(data.email));
            dispatch(FormActions.setPhone(data.phone.replace(/[^\d]/g, '')));
            navigate(ROUTES.CREATE);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack.V
                align='start'
                justify='start'
                gap='24'
                className={cl.fields}
            >
                <InputMask
                    {...register('phone')}
                    error={errors.phone}
                    variant='darken'
                    label='Номер телефона'
                    type='phone'
                    mask='+7 (999) 999-99-99'
                    placeholder='+7 (908) 329-57-87'
                />

                <Field
                    {...register('email')}
                    error={errors.email}
                    variant='darken'
                    label='Email'
                    type='email'
                    placeholder='ctaricc@mail.ru'
                />
            </Stack.V>

            <Button
                disabled={isSubmitting}
                variant='contained'
                className={cl.btn}
                type='submit'
            >
                Начать
            </Button>
        </form>
    );
};
