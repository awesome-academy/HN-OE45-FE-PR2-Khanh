import React, { useEffect } from "react";
import styles from "./ProductDetails.module.sass"
import ToastNotify from "../../components/ToastNotify/ToastNotify";
import ProductDetailsContent from "./ProductDetailsContent/ProductDetailsContent";
import ProductItemGridView from "../../components/ProductItemGridView/ProductItemGridView";
import { useDispatch, useSelector } from "react-redux"
import { getProductDetailsDbJson, getSimilarProducts, setFilterSimilar } from "../../store/slices/ProductSlice"
import { useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next'
function ProductDetails() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { type, message } = useSelector( state => state.notification) 
    const { productDetails } = useSelector(({products}) => products)
    const { content, similar, filter: filterSimilar } = productDetails
    const productDesc = content[0]
    const { list: similarList, isLoading: isLoadingSimilar } = similar
    const { _limit } = filterSimilar

    useEffect(() => {
        dispatch(getProductDetailsDbJson(id))
    }, [id, dispatch])

    useEffect(() => {
        if (productDesc) {
            dispatch(getSimilarProducts({
                ...filterSimilar,
                categories_like: productDesc.categories,
            }))
        }
        console.log(_limit)
    }, [productDesc, filterSimilar])

    const handleFetchSimilarProducts = () => {
        dispatch(setFilterSimilar({
            ...filterSimilar,
            _limit: _limit + 2
        }))
    }

    return (
        <div className={styles["details"]}>
            <div className={styles["toast"]}>
                {
                    message && <ToastNotify type={type} message={message}/>
                }
            </div>
            {
                productDesc && 
                <ProductDetailsContent
                    productDesc={productDesc}
                />
            }
            <section>
                <h2 className={styles["product-title"]}>{t("Similar products")} :</h2>
                <div className={styles['similar-products']}>
                    {
                        similarList && similarList.map((item, index) => <ProductItemGridView key={index} item={item} />)
                    }
                </div>
                <a onClick={() => handleFetchSimilarProducts()} className={styles['show-more']}>{t('Show more')}</a>
            </section>
        </div>
    );
}

export default ProductDetails;
