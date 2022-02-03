import React from 'react';
import styles from './ProductItemListView.module.sass'
import LuggageCartLineIcon from 'remixicon-react/LuggageCartLineIcon'
import Star from '../Star/Star'
import {useTranslation} from 'react-i18next'

function ProductItemListView({item}) {
    
    const { t } = useTranslation()

    return (
        <div className={styles["item-products"]}>
            <img src={`./assets/images/${item.image}`} alt="img" />
            <div className={styles["product-preview"]}>
                <span className={styles["product-price"]}>{item.name}$</span>
                <p className={styles["product-desc"]}>{item.desc}</p>
                <div className="d-flex align-items-center gap-5">
                    <div className={styles["product-rating"]}>
                        <Star 
                            num={item.rating}
                        />
                    </div>
                    <button className={styles["add-cart"]}>
                        <LuggageCartLineIcon />
                        {t("Add to cart")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductItemListView;