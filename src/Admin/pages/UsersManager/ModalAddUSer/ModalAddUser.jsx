import React from 'react';
import styles from './ModalAddUser.module.sass'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import { setIsOpenAddModal } from "../../../../store/slices/AdminSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup' 
import { regexEmail, regexPassword, regexPhone } from '../../../../consts/consts'
import FormGroup from '../../../../components/FormGroup/FormGroup';
import { Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../firebase-config'
import { setNotification } from '../../../../store/slices/NotificationSlice'
import { addUserDbJson, getAllUser } from '../../../../store/slices/UserSlice'

function ModalAddUser() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const filterUser = useSelector(state => state.user.filterUser)
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            role: ''
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
                .matches(regexPassword,t("Password must be 8-19 charactors and contain at least one uppercase letter, one lowercase letter and one number")),
            confirmPassword: 
                Yup.string()
                .required(t("Required"))
                .oneOf([Yup.ref("password"), null], t("Password must match"))
        }),
        onSubmit: async (formValue) => {
            try {
                const { fullName, email, password, phone, role } = formik.values
                const userFirebase = await createUserWithEmailAndPassword(
                    auth, 
                    email, 
                    password
                )
                const user = userFirebase.user
                const newUser = { id: user.uid, fullName, email, phone, password, role }
                dispatch(setNotification({type: 'success', message: t('Register Success')}))
                dispatch(setIsOpenAddModal(false))
                dispatch(getAllUser(filterUser))
                dispatch(addUserDbJson(newUser))
            } catch (err) {
                dispatch(setNotification({type: 'error', message: t('Register Failed')}))
                return err.message
            }
        }
    })

    const handleCloseModal = () => {
        dispatch(setIsOpenAddModal(false))
    }

    return (
        <section className={styles['modal-add']}>
            <CloseLineIcon className={styles["modal-add--close"]} onClick={handleCloseModal} />
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
                <FormGroup 
                    label={t('Role')}
                    id='role'
                    type='text'
                    name='role'
                    placeholder='Enter your Role'
                    value={formik.values.role}
                    handleChange={formik.handleChange}
                    error={formik.errors.role}
                />  
                <Button className="mt-3" variant="outline-primary" type="submit" size="lg">{t("Submit")}</Button>
            </Form>
        </section>
    );
}

export default ModalAddUser;
