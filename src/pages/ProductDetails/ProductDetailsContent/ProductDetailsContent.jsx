import React from "react";
import PriceTag3LineIcon from "remixicon-react/PriceTag3LineIcon"
import Star from "../../../components/Star/Star"
import LuggageCartLineIcon from "remixicon-react/LuggageCartLineIcon"
import SuitcaseLineIcon from "remixicon-react/SuitcaseLineIcon"
import ExchangeDollarLineIcon from "remixicon-react/ExchangeDollarLineIcon"
import Message3LineIcon from "remixicon-react/Message3LineIcon"
import styles from "../ProductDetails.module.sass"
import { useTranslation } from "react-i18next"
import { setCartsLength } from "../../../store/slices/CartSlice"
import { handleAddToCartLocal, getAddCartMessage, getLocalStorage } from "../../../helper/helper"
import { setNotification } from "../../../store/slices/NotificationSlice"
import { useDispatch } from "react-redux"

function ProductDetailsContent({productDesc}) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const localCartItems = getLocalStorage("local-cart")

    function handleAddToCart(productDesc) {
        const newCartItem = { ...productDesc, quantity: 1 }
        const message = getAddCartMessage(newCartItem)
        handleAddToCartLocal(newCartItem, localCartItems)
        dispatch(setNotification({type: "success", message}))
        let newCartsLength = getLocalStorage("local-cart").length
        dispatch(setCartsLength(newCartsLength))
    }

    return (
        <section className={styles["product-details"]}>
            <img src={`../assets/images/${productDesc.image}`} alt={productDesc.image} />
            <div className={styles["product-info"]}>
                <div className={styles["product-name"]}>
                    <div className={styles["product-title"]}>
                        <SuitcaseLineIcon />
                        <h2>{t("Product name")}:</h2>
                    </div>
                    <span>{productDesc.name}</span>
                </div>
                <div className={styles["product-tags"]}>
                    <div className={styles["product-title"]}>
                        <PriceTag3LineIcon />
                        <h2>{t("Categories")}:</h2>  
                    </div>
                    <span>{productDesc.categories}</span>
                </div>
                <div className={styles["product-price"]}>
                    <div className={styles["product-title"]}>
                        <ExchangeDollarLineIcon />
                        <h2>{t("Price")}:</h2>
                    </div>
                    <span>{productDesc.price}$</span>
                </div>
                <div className="d-flex align-items-center">
                    <div className={styles["product-rating"]}>
                        <Star 
                            num={productDesc.rating}
                        />
                    </div>
                    <button className={styles["add-cart"]} onClick={() => handleAddToCart(productDesc)}>
                        <LuggageCartLineIcon />
                        {t("Add to cart")}
                    </button>
                </div>
                <div className={styles["product-desc"]}>
                    <div className={styles["product-title"]}>
                        <Message3LineIcon />
                        <h2>{t("Description")}:</h2>
                    </div>
                    <p>{productDesc.detail_desc}</p>
                </div>
            </div>
        </section>
    )
}

export default ProductDetailsContent;
