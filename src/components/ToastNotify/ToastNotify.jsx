import React from 'react';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearNotification } from '../../store/slices/NotificationSlice'
import styles from './ToastNotify.module.sass'
import { Toast } from 'react-bootstrap'

function ToastNotify({type, message}) {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(()=> {
            dispatch(clearNotification())
        }, 1500)
    }, [dispatch])

    const setHeaderByType = (type) => {
        switch (type) {
            case 'error':
                return <h3 className={styles["text-red"]}>Error!</h3>
            case 'warning':
                return <h3 className={styles["text-orange"]}>Warning!</h3>
            case 'notifi':
                return <h3 className={styles["text-blue"]}>Notification!</h3>
            default:
                return <h3 className={styles["text-green"]}>Successfully!</h3>
        }
    }

    return (
        <section className={styles['toast']}>
            <Toast className={styles["toast-notify"]}>
                <Toast.Header>
                    <strong className="me-auto">{setHeaderByType(type)}</strong>
                </Toast.Header>
                <Toast.Body>
                    <span>{message}</span> 
                </Toast.Body>
            </Toast>
        </section>
    );
}

export default ToastNotify;
