import * as yup from 'yup';

export interface AuthFormFields {
    email: string;
    phone: string;
}

export const AuthSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Обязательное поле')
        .matches(
            /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm,
            'Введите номер'
        ),
    email: yup
        .string()
        .email('Неверный формат email')
        .required('Обязательное поле')
        .matches(/^[^\s@]+@[^\s@]+\.(ru|com)$/i, 'Неверный формат email')
});
