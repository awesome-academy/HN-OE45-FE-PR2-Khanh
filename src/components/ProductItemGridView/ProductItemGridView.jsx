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
        <div className={styles["item-products"]}>
            <Link to={href} className="text-center">
                <img src={`../assets/images/${item.image}`} alt="img"/>
            </Link>
            <div className={styles["product-preview"]}>
                <span className={styles["product-name"]}>{item.name}</span>
                <span className={styles["product-price"]}>{item.price}$</span>
                <p className={styles["product-desc"]}>{item.desc}</p>
                <div className="d-flex flex-column justify-content-center">
                    <div className={styles["product-rating"]}>
                        <Star 
                            num={item.rating}
                        />
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
