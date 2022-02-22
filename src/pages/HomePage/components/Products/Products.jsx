import React, { useEffect, useState } from 'react';
import styles from './Products.module.sass'
import ListCheckIcon from 'remixicon-react/ListCheckIcon'
import GridLineIcon from 'remixicon-react/GridLineIcon'
import clsx from 'clsx'
import ProductItemGridView from '../../../../components/ProductItemGridView/ProductItemGridView'
import ProductItemListView from '../../../../components/ProductItemListView/ProductItemListView' 
import Pagination from '../../../../components/Pagination/Pagination'
import { useTranslation } from 'react-i18next'
import { getAllProducts, setFilter, getPagination, setCurrentPage, setInputSearch  } from '../../../../store/slices/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import ToastNotify from '../../../../components/ToastNotify/ToastNotify'

function Products() {
    const { t } = useTranslation()
    const pagination = useSelector( state => state.products.pagination)
    const dispatch = useDispatch()
    const { _limit, _totalRows } = pagination
    const VIEW_MODES = [
        {
            value: 'grid',
            icon: GridLineIcon,
        },
        {
            value: 'list',
            icon: ListCheckIcon,
        },
    ];
    const PRODUCTS_LIST = [t('Show All'), t('Sale Off'), t('Features')]
    const { listAllProducts, isLoading } = useSelector( state => state.products.allProducts)
    const filter = useSelector( state => state.products.filter)
    const [viewMode, setViewMode] = useState(VIEW_MODES[0].value);
    const [productsList, setProductsList] = useState(PRODUCTS_LIST[0])   
    const relatedSearch = useSelector( state => state.products.relatedSearch)
    const { type, message } = useSelector( state => state.notification) 

    useEffect(() => {
        dispatch(getAllProducts(filter))
        dispatch(getPagination({
            ...filter,
            _page: '',
            _limit: ''
        }))
    },[filter, dispatch])

    function ListView() {
        return (
            <div className={styles["list-view"]}>
                { 
                    isLoading ? <h1>Loading...</h1> : listAllProducts.map((item, index) => (
                                                        <ProductItemGridView
                                                            item={item}
                                                            key={index}
                                                        />
                                                    ))
                }
            </div>
        )
    }

    function GridView() {
        return (
            <div className={styles["grid-view"]}>
                {
                    isLoading ? <h1>Loading...</h1> : listAllProducts.map((item, index) => (
                        <ProductItemListView
                            item={item}
                            key={index}
                        />
                    ))
                }
            </div>
        )
    }

    function handleSortByProductsList(item) {
        if (item == "Show All") {
            dispatch(setFilter({
                ...filter,
                _limit: 8,
                _page: 1,
                label_like: '',
            }))
            setProductsList(item)
        } else {
            dispatch(setFilter({
                ...filter,
                _page: 1,
                label_like: item
            }))
            setProductsList(item)
        }
        dispatch(setCurrentPage(1))
    }

    function handleSortByPrice(e) {
        const { value } = e.target

        dispatch(setFilter({
            ...filter,
            _page: 1,
            _sort: value === 'default' ? '' : 'price',
            _order: value === 'default' ? '' : value
        }));
        dispatch(setCurrentPage(1))
    } 

    function handleFilterRalatedSearch(item) {
        dispatch(setInputSearch(item))
        dispatch(setFilter({
            ...filter,
            _page: 1,
            name_like: item
        }))
    }

    return (
        <div className={styles["products"]}>
            <div className={styles["utilities-products"]}>
                <select className={styles["sort-price"]} onChange={handleSortByPrice}>
                    <option value="default">{t("Default")}</option> 
                    <option value="esc">{t("Price ESC")}</option>
                    <option value="desc">{t("Price DESC")}</option>
                </select>
                <div className={styles["opt-products"]}>
                    {
                        PRODUCTS_LIST.map( (item, index) => (
                            <button className={clsx(
                                styles["button"],
                                item === productsList && styles.active
                              )}
                              key={index}
                              onClick={() => handleSortByProductsList(item)}
                            >
                                {item}
                            </button>
                        ))
                    }
                    {
                        VIEW_MODES.map(({ value, icon: Icon }, index) => (
                            <button className={clsx(
                                styles["button"],
                                value === viewMode && styles.active
                              )}
                              key={index}
                              onClick={() => setViewMode(value)}
                            >
                                <Icon />
                            </button>
                         ))
                    }
                </div>
            </div>
            <div className={styles["related-search"]}>
                <h2>Related:</h2>
                {
                    relatedSearch.map((item, index) => {
                        return (
                            <span className={styles["item-related"]} key={index} onClick={() => handleFilterRalatedSearch(item)}>{item}</span>
                        )
                    })
                }
            </div>
            <div className={styles["toast"]}>
                {
                    message && <ToastNotify type={type} message={message}/>
                }
            </div>
            {
                viewMode == 'grid' ? <ListView /> : <GridView />
            }
            <Pagination 
                _limit={_limit}
                _totalRows={_totalRows}
            />
        </div>
    );
}

export default Products;
