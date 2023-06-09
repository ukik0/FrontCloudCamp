import * as yup from 'yup';

export interface AboutFormField {
    field: string;
}

export const AboutSchema = yup.object().shape({
    field: yup
        .string()
        .required('Поле обязательно')
        .test(
            'len',
            'Максимальная длина - 200 символов',
            (val) => val!.replace(/\s/g, '').length <= 200
        )
});
