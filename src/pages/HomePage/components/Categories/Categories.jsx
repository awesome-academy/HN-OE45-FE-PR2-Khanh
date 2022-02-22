import React, { useEffect } from 'react';
import styles from './Categories.module.sass'
import ArrowDropRightFillIcon from 'remixicon-react/ArrowDropRightFillIcon'
import {useTranslation} from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { getPostApi, setFilter, setCurrentPage, setSelectedCategory } from '../../../../store/slices/ProductSlice'
import clsx from 'clsx';

function Categories() {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { categoriesList } = useSelector(state => state.products.categories)
    const filter = useSelector(state => state.products.filter)
    const category = useSelector(state => state.products.selected.category)

    useEffect(() => {
        dispatch(getPostApi())
    },[])

    function handleFilterCategories(categories) {
        dispatch(setFilter({
            ...filter,
            _page: 1,
            categories_like: categories
        }))
        dispatch(setSelectedCategory(categories))
        dispatch(setCurrentPage(1))
    }

    return (
        <div className={styles["categories"]}>
            <h2>{t("Categories")}: </h2>
            <ul className={styles["list-categories"]}>
                {
                    categoriesList.map( (item, index) => {
                        return (
                            <li key={index} className={clsx(styles["item-categories"],
                                category && category.includes(item)
                                ? styles["active"] : ""
                                )} 
                                onClick={() => handleFilterCategories(item)}
                            >
                                <ArrowDropRightFillIcon />
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default Categories;
