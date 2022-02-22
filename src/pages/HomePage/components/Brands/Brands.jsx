import React, { useRef } from 'react';
import clsx from 'clsx'
import styles from './Brands.module.sass'
import {useTranslation} from 'react-i18next'
import { useSelector, useDispatch} from 'react-redux'
import { setFilter, setCurrentPage } from '../../../../store/slices/ProductSlice'

function Brands() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { brandsList } = useSelector( state => state.products.brands)
    const filter = useSelector( state => state.products.filter)

    function handleFilterBrands(e) {
        const { value, checked } = e.target
        dispatch(setFilter({
            ...filter,
            _page: 1,
            brand_like: checked ? value : ''
        }))
        dispatch(setCurrentPage(1))
    }

    return (
        <div className={styles["brands"]}>
            <h2>{t("Brand")}:</h2>
            <div className={styles["brand-item"]}>
                {
                    brandsList.map((item, index) => {
                        return (
                            <div className={clsx(styles["form-check"], "d-flex")} key={index}>
                                <input className="form-check-input" type="checkbox" value={item} id={item} onChange={handleFilterBrands} />
                                <label className="form-check-label" htmlFor={item}>
                                    {item}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Brands;
