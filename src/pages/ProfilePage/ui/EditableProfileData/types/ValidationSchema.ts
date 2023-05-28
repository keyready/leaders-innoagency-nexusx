import * as Yup from 'yup';

export const ProfileUpdateSchema = Yup.object({
    firstname: Yup.string()
        .matches(
            /^([А-ЯЁ][а-яё]{3,13})$/,
            'Пожалуйста, используйте буквы русского алфавита',
        )
        .required('Обязательное поле'),

    lastname: Yup.string()
        .matches(
            /^([А-ЯЁ][а-яё]{3,13})$/,
            'Пожалуйста, используйте буквы русского алфавита',
        )
        .required('Обязательное поле'),
}).required();

export const PasswordUpdateSchema = Yup.object({
    oldPassword: Yup.string()
        .required('Обязательное поле'),

    newPassword: Yup.string()
        .min(6, 'Используйте минимум 6 символов')
        .max(20, 'Максимум 20 символов')
        .matches(/[!#$%&*]/, 'Используйте специальные символы')
        .required('Обязательное поле'),

    repeatedPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Введенные пароли не совпадают')
        .required('Обязательное поле'),
}).required();
