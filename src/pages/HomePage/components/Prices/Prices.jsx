import React, { useState } from 'react';
import styles from './Prices.module.sass'
import {useTranslation} from 'react-i18next'
import { useDispatch, useSelector} from 'react-redux'
import { setFilter, setCurrentPage, setValueGte, setValueLte } from '../../../../store/slices/ProductSlice'

function Prices() {
    const { t } = useTranslation()
    const { valueGte, valueLte } = useSelector(state => state.products.valuePrice)
    const [ errorInputPrice, setErrorInputPrice ] = useState('')
    const dispatch = useDispatch()
    const filter = useSelector(state => state.products.filter)

    function handleValueGte(e) {
        if ((e.target.value || valueLte) <= -1) {
            dispatch(setValueGte(e.target.value))
            setErrorInputPrice('Input value must be positive')
        } else if ((e.target.value && valueLte) >= 0) {
            dispatch(setValueGte(e.target.value))
            setErrorInputPrice('')
        }
    }

    function handleValueLte(e) {
        if ((e.target.value || valueGte) <= -1) {
            dispatch(setValueLte(e.target.value))
            setErrorInputPrice('Input value must be positive')
        } else if ((e.target.value && valueGte) >= 0) {
            dispatch(setValueLte(e.target.value))
            setErrorInputPrice('')
        }
    }

    function handleFilterPrice() {
        dispatch(setFilter({
            ...filter,
            _page:1 ,
            price_gte: valueGte,
            price_lte: valueLte
        }))
        dispatch(setCurrentPage(1))
    }

    return (
        <div className={styles["prices"]}>
            <h2>{t("Price")}:</h2>
            <div className={styles["prices-range"]}>
                <div className={styles["values-input"]}>
                    <label htmlFor="gte">{t("From")}:</label>
                    <input type="number" 
                        id="gte"
                        value={valueGte}
                        onChange={handleValueGte}
                        className={styles.input}
                        min="0"
                    />
                    <label htmlFor="lte">{t("To")}:</label>
                    <input type="number" 
                        id="lte"
                        value={valueLte}
                        onChange={handleValueLte}
                        className={styles.input}
                        min="0"
                    />
                </div>
                {errorInputPrice}
                <button 
                    onClick={handleFilterPrice}
                    className={styles.button}
                    disabled={errorInputPrice}
                >
                    {t("Submit")}
                </button>
            </div>
        </div>
    );
}

export default Prices;
