import * as yup from 'yup';

export interface AdvantagesFormFields {
    advantages: string[];
    radio: number;
    checkbox: number[];
}

export const AdvantagesSchema = yup.object().shape({
    advantages: yup
        .array()
        .of(yup.string().required('Обязательное поле'))
        .min(1, 'Заполните минимум 1 поле'),
    radio: yup.number().required('Обязательное поле'),
    checkbox: yup.array().min(1, 'Выберите минимум 1 поле')
});
