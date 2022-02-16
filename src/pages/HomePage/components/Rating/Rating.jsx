import React from 'react';
import styles from './Rating.module.sass'
import Star from '../../../../components/Star/Star'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, setCurrentPage, setSelectedRating } from '../../../../store/slices/ProductSlice'

function Rating() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { rating } = useSelector(state => state.products.selected)
    const filter = useSelector(state => state.products.filter)

    function handleFilterStar(num) {
        dispatch(setFilter({
            ...filter,
            _page: 1,
            rating_like: num
        }))
        dispatch(setSelectedRating(num))
        dispatch(setCurrentPage(1))
    } 

    return (
        <div className={clsx(styles["rating"], "d-flex", "flex-column")}>
            <h2>{t("Rating")}:</h2>
            {
                [1,2,3,4,5].map((num, index) => {
                    return (
                        <div className={clsx(styles["rating-star"],
                            rating && rating.includes(num)
                            ? styles["active"] : ""
                            )}
                            key={index}
                            onClick={() => handleFilterStar(num)}
                        >
                            <Star 
                                num={num}
                                size={20}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Rating;
