import React from 'react';
import styles from './ProductItemGridView.module.sass'
import LuggageCartLineIcon from 'remixicon-react/LuggageCartLineIcon'
import Star from '../Star/Star'
import {useTranslation} from 'react-i18next'
import { handleAddToCartLocal, getAddCartMessage, getLocalStorage } from '../../helper/helper'
import { setNotification } from '../../store/slices/NotificationSlice'
import { setCartsLength } from '../../store/slices/CartSlice';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function ProductItem({item}) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const localCartItems = getLocalStorage('local-cart')
    let href = `/product-details/${item.id}`

    function handleAddToCart(item) {
        const newCartItem = { ...item, quantity: 1 }
        const message = getAddCartMessage(newCartItem)
        handleAddToCartLocal(newCartItem, localCartItems)
        dispatch(setNotification({type: 'success', message}))
        let newCartsLength = getLocalStorage('local-cart').length
        dispatch(setCartsLength(newCartsLength))
    }

    return (
        <div className={styles["product-items"]}>
            <Link to={href} className="text-center">
                <img src={`../assets/images/${item.image}`} alt="img"/>
            </Link>
            <div className={styles["product-preview"]}>
                <div className={styles["product-preview__top"]}>
                    <span className={styles["product-name"]}>{item.name}</span>
                    <p className={styles["product-desc"]}>{item.desc}</p>
                </div>
                <div className={styles["product-preview__bottom"]}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className={styles["product-price"]}>{item.price}$</span>
                        <div className={styles["product-rating"]}>
                            <Star 
                                num={item.rating}
                            />
                        </div>
                    </div>
                    <button className={styles["add-cart"]} onClick={() => handleAddToCart(item)}>
                        <LuggageCartLineIcon />
                        {t("Add to cart")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
