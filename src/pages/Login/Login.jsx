import React from 'react';
import FormGroup from '../../components/FormGroup/FormGroup';
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup' 
import styles from './Login.module.sass'
import { regexEmail, regexPassword } from '../../consts/consts'
import { useTranslation } from 'react-i18next'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase-config";
import { getUserDetailDbJson } from '../../store/slices/UserSlice'
import { setNotification } from '../../store/slices/NotificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import ToastNotify from '../../components/ToastNotify/ToastNotify'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { type, message } = useSelector(state => state.notification)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: 
                Yup.string()
                .required(t("Required"))
                .matches(regexEmail, t("Please enter a valid email address")),
            password:
                Yup.string()
                .required(t("Required"))
                .matches(regexPassword, t("Password must be 7-19 charactors and contain at least one letter, one number and a special charactors"))
        }),
        onSubmit: async (formValue) => {
            try {
                const {email, password} = formik.values
                const userFirebase = await signInWithEmailAndPassword(
                    auth, 
                    email, 
                    password
                )
                const user = userFirebase.user
                await dispatch(getUserDetailDbJson(user.uid))
                dispatch(setNotification({type: 'success', message: t('Login Success')}))
                navigate('/')
            } catch (err) {
                dispatch(setNotification({type: 'error', message: t('Login Failed')}))
                return err.message
            }
        }
    })

    return (
        <section className={styles['form-login']}>
            <div className={styles["toast"]}>
                {
                    message && <ToastNotify type={type} message={message}/>
                }
            </div>
            <Form className={styles['form-input']} onSubmit={formik.handleSubmit}>
                <h2 className={styles['form-title']}>{t('Sign In')}</h2>
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
                    label={t('Password')}
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Enter your Password'
                    value={formik.values.password}
                    handleChange={formik.handleChange}
                    error={formik.errors.password}
                />
                <Button variant="outline-primary" type="submit" size="lg">Submit</Button>
            </Form>
        </section>
    );
}

export default Login;
