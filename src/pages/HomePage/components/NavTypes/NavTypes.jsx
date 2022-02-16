import React from 'react';
import styles from './Navtypes.module.sass'
import { setFilter, setCurrentPage, setSelectedType } from '../../../../store/slices/ProductSlice' 
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'

function NavTypes() {
    const dispatch = useDispatch()
    const { filter, selected } = useSelector(({products}) => products)
    const { typesList } = useSelector(state => state.products.types)
    const { type } = selected

    function handleFilterTypes(item) {
        dispatch(setFilter({
            ...filter,
            _page: 1,
            type_like: item
        }))
        dispatch(setSelectedType(item))
        dispatch(setCurrentPage(1))
    }

    return (
        <nav className={styles["nav-types"]}>
            <ul className={styles["list-types"]}>
                {
                    typesList.map( (item, index) => {
                        return (
                            <li className={clsx(styles["item-types"],
                                type && type.includes(item)
                                ? styles["active"] : ""
                                )} 
                                key={index} 
                                onClick={() => handleFilterTypes(item)}
                            >
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    );
}

export default NavTypes;
