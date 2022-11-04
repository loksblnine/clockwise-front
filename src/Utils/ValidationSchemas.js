import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Please, enter your First Name.'),
    last_name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Please, enter your Last Name.'),
    role: Yup.string()
        .required('Please, choose your role.'),
    birthDate: Yup.string()
        .required('Please, enter your birth date.'),
    primarySpecialty: Yup.string()
        .required('Please, enter your specialty.'),
    secondarySpecialty: Yup.string()
        .required('Please, enter your specialty.'),
    clinic: Yup.string()
        .required('Please, enter your specialty.'),
    location: Yup.string()
        .min(2, 'Too Short!')
        .max(40, 'Too Long!')
        .required('Please, enter your postal code.'),
    telephone: Yup.string()
        // .matches(new RegExp('^[+]{1}[0-9]{2} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}$'), 'Please enter your phone number matches to +49 888 888 88 88')
        .required('Please, enter your phone number.'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please, enter your email.'),
    password: Yup.string()
        .required('Please, enter your password.'),
    confirmPassword: Yup.string()
        .required('Please, confirm your password.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    checkmark: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .default(false)
});

export const DoctorsSignInSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Please, enter your First Name.'),
    last_name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Please, enter your Last Name.'),
    birthDate: Yup.string()
        .required('Please, enter your birth date.'),
    primarySpecialty: Yup.string()
        .required('Please, enter your specialty.'),
    secondarySpecialty: Yup.string()
        .required('Please, enter your specialty.'),
    clinic: Yup.string()
        .required('Please, enter your specialty.'),
    location: Yup.string()
        .min(2, 'Too Short!')
        .max(40, 'Too Long!')
        .required('Please, enter your postal code.'),
    telephone: Yup.string()
        // .matches(new RegExp('^[+]{1}[0-9]{2} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}$'), 'Please enter your phone number matches to +49 888 888 88 88')
        .required('Please, enter your phone number.'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please, enter your email.'),
    password: Yup.string()
        .required('Please, enter your password.'),
    confirmPassword: Yup.string()
        .required('Please, confirm your password.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    checkmark: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .default(false)
});

export const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Please, enter your email.'),
    password: Yup.string()
        .required('Please, enter your password.')
});

export const EditUserSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Please, enter your First Name.'),
    last_name: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Please, enter your Last Name.'),
    birthDate: Yup.string()
        .required('Please, enter your birth date.'),
    // primarySpecialty: Yup.string()
    //     .required('Please, enter your specialty.'),
    // secondarySpecialty: Yup.string()
    //     .required('Please, enter your specialty.'),
    // clinic: Yup.string()
    //     .required('Please, enter your specialty.'),
    location: Yup.string()
        .min(2, 'Too Short!')
        .max(40, 'Too Long!')
        .required('Please, enter your postal code.'),
    telephone: Yup.string()
        // .matches(new RegExp('^[+]{1}[0-9]{2} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}$'), 'Please enter your phone number matches to +49 888 888 88 88')
        .required('Please, enter your phone number.'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please, enter your email.'),
});

export const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Please, enter your email.'),

});

export const ChangePasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required('Please, enter your password.'),
    confirmPassword: Yup.string()
        .required('Please, confirm your password.')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});






