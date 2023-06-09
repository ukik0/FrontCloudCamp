import { Button, Field, Select, Stack } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { InfoFormFields, InfoSchema, ROUTES } from '@/utils/constants';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    FormActions,
    getName,
    getNickname,
    getSex,
    getSurname
} from '@/store/slices';
import { useDispatch } from 'react-redux';
import cl from './InfoStep.module.scss';
import { useTypedSelector } from '@/utils/hooks';

interface InfoStepProps {
    next: () => void;
}

const Options = [
    { value: 'man', content: 'man' },
    { value: 'woman', content: 'woman' }
];

export const InfoStep = ({ next }: InfoStepProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useTypedSelector(getName);
    const nickname = useTypedSelector(getNickname);
    const surname = useTypedSelector(getSurname);
    const sex = useTypedSelector(getSex);

    const handleBackClick = () => {
        navigate(ROUTES.ROOT);
    };

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
            next();
            dispatch(FormActions.setName(data.name));
            dispatch(FormActions.setNickname(data.nickname));
            dispatch(FormActions.setSurname(data.surname));
            dispatch(FormActions.setSex(data.sex));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack.V gap='24' className={cl.fields} align='start'>
                <Field
                    label='Name'
                    placeholder='Nickname'
                    {...register('nickname')}
                    error={errors.nickname}
                />
                <Field
                    label='Nickname'
                    placeholder='Name'
                    {...register('name')}
                    error={errors.name}
                />
                <Field
                    label='Surname'
                    placeholder='Surname'
                    {...register('surname')}
                    error={errors.surname}
                />
                <Controller
                    render={({ field }) => (
                        <Select
                            label='Sex'
                            options={Options}
                            {...register('sex')}
                            error={errors.sex}
                            {...field}
                        />
                    )}
                    name='sex'
                    control={control}
                ></Controller>
            </Stack.V>

            <Stack.H justify='between' gap='16'>
                <Button onClick={handleBackClick} variant='outlined'>
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
        </form>
    );
};
