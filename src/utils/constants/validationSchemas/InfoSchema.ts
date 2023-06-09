import * as yup from 'yup';

export interface InfoFormFields {
    nickname: string;
    name: string;
    surname: string;
    sex: 'man' | 'woman';
}

export const InfoSchema = yup.object().shape({
    nickname: yup
        .string()
        .required('Поле обязательно')
        .max(30, 'Максимальная длина 30 символов')
        .matches(
            /^[а-яА-ЯёЁ0-9a-zA-Z\s]+$/,
            'Может содержать только буквы и цифры'
        ),
    name: yup
        .string()
        .required('Поле обязательно')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[а-яА-ЯёЁa-zA-Z\s]+$/, 'Может содержать только буквы'),
    surname: yup
        .string()
        .required('Поле обязательно')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[а-яА-ЯёЁa-zA-Z\s]+$/, 'Может содержать только буквы'),
    sex: yup
        .mixed<InfoFormFields['sex']>()
        .required('Поле обязательно')
        .oneOf(['man', 'woman'], 'Значение должно быть "man" или "woman"')
});
