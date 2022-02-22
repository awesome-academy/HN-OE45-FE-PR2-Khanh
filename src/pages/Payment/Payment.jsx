import React, { useState } from 'react';
import styles from './Payment.module.sass'
import Select from 'react-select';
import { Form, Button } from 'react-bootstrap'
import FormGroup from '../../components/FormGroup/FormGroup';
import { useFormik } from 'formik'
import * as Yup from 'yup' 
import { useTranslation } from 'react-i18next'
import { regexEmail, regexPhone } from '../../consts/consts'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Payment() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [payments, setPayments] = useState(null)
    const { fullName, email, phone, address } = useSelector(state => state.cart.paymentInfo)
    const payment_method = [
        { value: 'Bank card', label: 'Bank cart' },
        { value: 'Payment on delivery', label: 'Payment on delivery' },
    ]
    const formik = useFormik({
        initialValues: {
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            message: '',
        },
        validationSchema: Yup.object({
            fullName:  
                Yup.string()
                .required(t("Required"))
                .min(4, t('Must be 4 charactor or more')),
            email: 
                Yup.string()
                .required(t("Required"))
                .matches(regexEmail, t("Please enter a valid email address")),
            phone: 
                Yup.string()
                .required(t("Required"))
                .matches(regexPhone, t("Must be a valid phone number")),
            address: 
                Yup.string()
                .required(t("Required"))
        }),
        onSubmit: (formValue) => {
            const paymentsValue = payments.value
            localStorage.setItem('local-payment-info', JSON.stringify([{...formValue, paymentsValue}])) 
            navigate('/confirm-payment')
        }
    })

    return (
        <section className={styles['form-payments']}>
            <h2 className={styles['form-title']}>{t('Delivery information')}</h2>
            <Form className={styles['form-input']} onSubmit={formik.handleSubmit}>
                <FormGroup 
                    label={t('Full name')}
                    id='fullName'
                    type='text'
                    name='fullName'
                    placeholder='Enter your Full Name'
                    value={formik.values.fullName}
                    handleChange={formik.handleChange}
                    error={formik.errors.fullName}
                />
                <FormGroup 
                    label={t('Email address')}
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
                    label={t('Delivery address')}
                    id='address'
                    type='text'
                    name='address'
                    placeholder='Enter your Address'
                    value={formik.values.address}
                    handleChange={formik.handleChange}
                    error={formik.errors.address}
                />         
                <FormGroup 
                    label={t('Message')}
                    id='message'
                    type='text'
                    name='message'
                    placeholder='Enter your Message'
                    value={formik.values.message}
                    handleChange={formik.handleChange}
                />
                <Form.Group controlId='select'>
                    <Form.Label className={styles['form-label']}>{t('Payment method')} :</Form.Label>
                    <Select
                        className={styles['form-select']}
                        defaultValue={payments}
                        onChange={setPayments}
                        options={payment_method}
                    />   
                </Form.Group> 
                <Button variant="outline-primary" type="submit" size="lg">{t('Submit')}</Button>
            </Form>
        </section>
    );
}

export default Payment;
