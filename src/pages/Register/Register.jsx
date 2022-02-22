import React from 'react';
import FormGroup from '../../components/FormGroup/FormGroup';
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup' 
import styles from './Register.module.sass'
import { regexEmail, regexPassword, regexPhone } from '../../consts/consts'
import { useTranslation } from 'react-i18next'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../firebase-config";
import { addUserDbJson, setDisplayName } from '../../store/slices/UserSlice'
import { useDispatch, useSelector } from 'react-redux' 
import ToastNotify from '../../components/ToastNotify/ToastNotify'
import { setNotification } from '../../store/slices/NotificationSlice'
import { useNavigate } from 'react-router-dom' 

function Register() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { type, message } = useSelector(state => state.notification)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            fullName: 
                Yup.string()
                .required(t("Required"))
                .min(4, t("Must be 4 charactor or more")),
            email: 
                Yup.string()
                .required(t("Required"))
                .matches(regexEmail, t("Please enter a valid email address")),
            phone: 
                Yup.string()
                .required(t("Required"))
                .matches(regexPhone, t("Must be a valid phone number")),
            password:
                Yup.string()
                .required(t("Required"))
                .matches(regexPassword,t("Password must be 7-19 charactors and contain at least one uppercase letter, one lowercase letter and one number")),
            confirmPassword: 
                Yup.string()
                .required(t("Required"))
                .oneOf([Yup.ref("password"), null], t("Password must match"))
        }),
        onSubmit: async (formValue) => {
            try {
                const { fullName, email, password, phone } = formik.values
                const userFirebase = await createUserWithEmailAndPassword(
                    auth, 
                    email, 
                    password
                )
                const user = userFirebase.user
                const newUser = { id: user.uid, fullName, email, phone, password, carts: [], address: [], role: 2 }
                dispatch(setNotification({type: 'success', message: t('Register Success')}))
                localStorage.setItem('customer-info', JSON.stringify({
                    fullName,
                    email,
                    phone
                }))
                dispatch(addUserDbJson(newUser))
                navigate('/')
            } catch (err) {
                dispatch(setNotification({type: 'error', message: t('Register Failed')}))
                return err.message
            }
        }
    })

    return (
        <section className={styles['form-register']}>
            <div className={styles["toast"]}>
                {
                    message && <ToastNotify type={type} message={message}/>
                }
            </div>
            <Form className={styles['form-input']} onSubmit={formik.handleSubmit}>
                <h2 className={styles['form-title']}>{t('Register')}</h2>
                <FormGroup 
                    label={t('Full name')}
                    id='fullName'
                    type='fullName'
                    name='fullName'
                    placeholder='Enter your Full Name'
                    value={formik.values.fullName}
                    handleChange={formik.handleChange}
                    error={formik.errors.fullName}
                />
                <FormGroup 
                    label={t('Email')}
                    id='email'
                    type='email'
                    name='email'
                    placeholder='Enter your Email'
                    value={formik.values.email}
                    handleChange={formik.handleChange}
                    error={formik.errors.email}
                />
                <FormGroup 
                    label={t('Phone number')}
                    id='phone'
                    type='text'
                    name='phone'
                    placeholder='Enter your Phone'
                    value={formik.values.phone}
                    handleChange={formik.handleChange}
                    error={formik.errors.phone}
                />  
                <FormGroup 
                    label={t('Password')}
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Enter your Password'
                    value={formik.values.password}
                    handleChange={formik.handleChange}
                    error={formik.errors.password}
                />
                <FormGroup 
                    label={t('Confirm password')}
                    id='confirmPassword'
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm your password'
                    value={formik.values.confirmPassword}
                    handleChange={formik.handleChange}
                    error={formik.errors.confirmPassword}
                />
                <Button variant="outline-primary" type="submit" size="lg">{t("Submit")}</Button>
            </Form>
        </section>
    );
}

export default Register;
