import React from 'react';
import styles from './Pagination.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setCurrentPage } from '../../store/slices/ProductSlice'
import { useTranslation } from 'react-i18next';
import NumberedList from './NumberedList/NumberedList';
import { setFilterUser } from "../../store/slices/UserSlice"

function Pagination({ _limit, _totalRows }) {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const filter = useSelector(state => state.products.filter)
    const currentPage = useSelector(state => state.products.currentPage)
    const totalPages = Math.ceil(_totalRows / _limit)
    const filterUser = useSelector(state => state.user.filterUser)

    function handlePageChange(newPage) {
        dispatch(setCurrentPage(newPage));
        dispatch(setFilter({
            ...filter,
            _page: newPage
        }))
        dispatch(setFilterUser({
            ...filterUser,
            _page: newPage
        }))
    }

    return (
        <div className={styles.pagination}>
            <button
                disabled={ currentPage <= 1 }
                onClick={() => handlePageChange(currentPage - 1)}
            >
                {t("Prev")}
            </button>
            <NumberedList
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            <button
                disabled={ currentPage >= totalPages }
                onClick={() => handlePageChange(currentPage + 1)}
            >
                {t("Next")}
            </button>
        </div>
    );
}

export default Pagination;
