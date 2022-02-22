import React, { useState } from 'react';
import styles from './Cart.module.sass'
import { Table } from 'react-bootstrap'
import { getTotalCart, getTotalCartVAT, getLocalStorage } from '../../helper/helper'
import CartItem from './CartItem/CartItem';
import { Toast } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { setCartsLength, setValueInputPayment} from '../../store/slices/CartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Cart() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const location = useLocation()
    const [idCartDelete, setIdCartDelete] = useState('')
    const [isChange, setIsChangeQuantity] = useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const cartItems = getLocalStorage('local-cart')
    const cartsLength = useSelector(state => state.cart.cartsLength)
    const totalPay = getTotalCart(cartItems)
    const vat = 10
    const totalPayVAT = getTotalCartVAT(totalPay, vat)
    const hasLinkToPayment = location.pathname !== '/confirm-payment'
    const nextPayment = cartsLength > 0

    const toggleIsChangeQuantity = () => {
        setIsChangeQuantity(!isChange)
    }

    const getCartDelete = (id) => {
        setIsOpenConfirmModal(true)
        setIdCartDelete(id)
    }

    const getCartDelName = () => {
        const cartDelete = cartItems.find(cart => cart.id === idCartDelete)
        return cartDelete.name
    }

    const handleDelCart = () => {
        const newCarts = cartItems.filter(cart => cart.id !== idCartDelete)
        localStorage.setItem('local-cart', JSON.stringify(newCarts))
        dispatch(setCartsLength(newCarts.length))
        setIsOpenConfirmModal(false)
    }

    const handleSetValueInputPayment = () => {
        if (localStorage.getItem('customer-info')) {
            const { fullName, phone, email } = getLocalStorage('customer-info')
            dispatch(setValueInputPayment({
                fullName, 
                email, 
                phone
            }))
        }
    }

    return (
        <div className={styles["cart"]}>
            {
                hasLinkToPayment ? <h2>{t("My cart")} :</h2> : <h2>{t("Review cart")} :</h2>
            }
            {
                isOpenConfirmModal ?
                <Toast className={styles["toast"]}>
                    <Toast.Header>
                        <strong className="me-auto">{t('Confirm')}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <span>{`Delete "${getCartDelName()}" from Cart`}</span>
                        <div className='del-option flex-center'>
                            <button className='me-3'
                                onClick={()=>handleDelCart()}>{t('Ok')}</button>
                            <button
                                onClick={()=>setIsOpenConfirmModal(false)}>{t('Cancle')}</button>
                        </div>
                    </Toast.Body>
                </Toast>
                : null
            }
            <div className={styles["table-cart"]}>
                <Table bordered className={styles["table-cart"]}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>{t("Product Image")}</th>
                            <th>{t("Product Name")}</th>
                            <th>{t("Product Unit Price")}</th>
                            <th>{t("Product Quantity")}</th>
                            <th>{t("Into Price")}</th>
                            <th>{t("Delete")}</th>
                        </tr>
                    </thead>
                    {   cartsLength 
                        ? 
                        cartItems.map((item, index) => {
                            return (
                                <CartItem 
                                    key={index}
                                    item={item}
                                    stt={cartItems.indexOf(item) + 1}
                                    getCartDelete={getCartDelete}
                                    toggleIsChangeQuantity={toggleIsChangeQuantity}
                                    cartItems={cartItems}
                                />
                            )
                        })
                        :
                        <tbody>
                            <tr>
                                <td className="ta-center" colSpan="7">Chưa có sản phẩm</td>
                            </tr>
                        </tbody>
                    }
                </Table>
            </div>
            {
                totalPay 
                ? 
                <div className={styles["cart-pay"]}>
                        <Table bordered className={styles["table-cart"]} >
                            <thead>
                                <tr>
                                    <th>Total Price(No VAT)</th>
                                    <th>VAT</th>
                                    <th>Total Price(+ VAT)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{totalPay}$</td>
                                    <td>{vat}%</td>
                                    <td>{totalPayVAT}$</td>
                                </tr>
                            </tbody>
                        </Table>
                </div>
                : null
            }
            {
                hasLinkToPayment && <Link to={nextPayment ? "/payment" : "/cart"} className={styles['btn-payment']} onClick={handleSetValueInputPayment}>Payment</Link>
            }
        </div>
    );
}

export default Cart;
