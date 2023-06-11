export interface FormSchema {
    nickname: string | null;
    name: string | null;
    surname: string | null;
    phone: string | null;
    email: string | null;
    sex: 'man' | 'woman';
    advantages: string[];
    radio: number | null;
    checkbox: number[];
    about: string | null;
}
