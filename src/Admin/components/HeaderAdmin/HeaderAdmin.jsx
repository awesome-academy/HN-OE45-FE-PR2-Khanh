import React, { useState } from 'react'
import styles from "./HeaderAdmin.module.sass"
import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import useDebounce from '../../../hooks/useDebounce'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import LogoutBoxLineIcon from 'remixicon-react/LogoutBoxLineIcon'
import { setInputSearch, setFilter, setCurrentPage } from '../../../store/slices/ProductSlice'
import { useDispatch, useSelector} from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../../firebase-config'
import { getLocalStorage } from '../../../helper/helper'
import { setCartsLength } from '../../../store/slices/CartSlice'

function HeaderAdmin() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const inputSearch = useSelector(state => state.products.inputSearch)
    const debounce = useDebounce()
    const filter = useSelector(state => state.products.filter)
    const hasLinkToAdmin = location.pathname !== '/admin'
    const [user, setUser] = useState({})
    const customerInfo = getLocalStorage('customer-info')

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const logOut = async () => {
        await signOut(auth)
        localStorage.removeItem('local-cart')
        localStorage.removeItem('customer-info')
        localStorage.removeItem('local-payment-info')
        dispatch(setCartsLength(0))        
        navigate('/')
    }

    function handleSearchFilterChange(e) {
        const value = e.target.value
        dispatch(setInputSearch(value))
        debounce(() => {
            dispatch(setFilter({
                ...filter,
                _page: 1,
                name_like: value
            }))
            dispatch(setCurrentPage(1))
        }, 500)
    }

    function clearInputSearch() {
        dispatch(setInputSearch(""))
        dispatch(setFilter({
            ...filter,
            _page: 1,
            _limit: 2,
            name_like: ""
        }))
        dispatch(setCurrentPage(1))
    }

    return (
        <header>
            <div className={styles["header-container"]}>
                {
                    hasLinkToAdmin && 
                    <div className={styles["header-search"]}>
                        <SearchLineIcon className={styles["search-icon"]} />
                        <input 
                            type="text"
                            placeholder="Search a Products"
                            value={inputSearch}
                            onChange={handleSearchFilterChange}
                        />
                        {
                            inputSearch && <CloseLineIcon className={styles["close-icon"]} onClick={clearInputSearch} />
                        }
                    </div>
                }
                {
                    user 
                    &&
                    <div>
                        <DropdownButton
                            variant="outline-secondary"
                            title={customerInfo ? customerInfo.fullName : ''}
                            id="input-group-dropdown-1"
                            variant="outline-primary"
                        >
                            <Dropdown.Item onClick={logOut} className={styles['drop-item']}>
                                <LogoutBoxLineIcon />
                                Log out
                            </Dropdown.Item>
                        </DropdownButton>
                    </div> 
                }
            </div>
        </header>
    );
}

export default HeaderAdmin;
