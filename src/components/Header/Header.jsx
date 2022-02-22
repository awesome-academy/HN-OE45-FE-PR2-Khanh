import React, {useState, useRef, useEffect} from 'react';
import styles from './Header.module.sass'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/Logo.png'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ShoppingCart2LineIcon from 'remixicon-react/ShoppingCart2LineIcon'
import GlobalLineIcon from 'remixicon-react/GlobalLineIcon'
import {useTranslation} from 'react-i18next'
import MenuLineIcon from 'remixicon-react/MenuLineIcon'
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setCurrentPage, setInputSearch, setRelatedSearch } from '../../store/slices/ProductSlice'
import { setCartsLength } from '../../store/slices/CartSlice';
import useDebounce from '../../hooks/useDebounce'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'
import LogoutBoxLineIcon from 'remixicon-react/LogoutBoxLineIcon'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../../helper/helper'

function Header() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [language, setLanguage] = useState("en")
    const [toggle, setToggle] = useState(false)
    const inputSearch = useSelector(state => state.products.inputSearch)
    const filter = useSelector(state => state.products.filter)
    const debounce = useDebounce()
    const cartsLength = useSelector(state => state.cart.cartsLength)
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const customerInfo = getLocalStorage('customer-info')
    
    useEffect(()=> {
        dispatch(setCartsLength(cartsLength))
    }, [cartsLength])

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

    function changeLanguage() {
        if(language === "en") {
            i18n.changeLanguage("vi")
            setLanguage("vi")
        } else {
            i18n.changeLanguage("en")
            setLanguage("en")
        }
    }

    function handleToggleMenu() {
        setToggle(prevState => !prevState)
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
            dispatch(setRelatedSearch(value))
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
        <header className={styles["header"]}>
            <div className={styles["header-container"]}>
                <Link to="/">
                    <img className={styles["logo"]} src={Logo} alt="logo" />
                </Link>
                <div className={ toggle ? styles["toggle"] :  styles["tool-pc"] }>
                    <GlobalLineIcon className={styles["change-language"]}
                        onClick={changeLanguage}
                    />
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
                    <div className={styles["account"]}>
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
                                    <Dropdown.Item href="#" className={styles['drop-item']}>Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={logOut} className={styles['drop-item']}>
                                        <LogoutBoxLineIcon />
                                        Log out
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div> 
                        }
                        <Link className={styles["sign-in"]} to="/signin" style={user && { display: "none"}}>{t("Sign in")}</Link>
                        <Link className={styles["register"]} to="/register">{t("Register")}</Link>
                        <Link className={styles["cart"]} to="/cart">
                            <ShoppingCart2LineIcon className={styles["cart-icon"]} />
                            {t("Cart")}
                            <span className={styles["cart-length"]}>{cartsLength}</span>
                        </Link>
                    </div>
                </div>
                <MenuLineIcon onClick={handleToggleMenu} className={styles["menu-icon"]} />
            </div>
        </header>
    );
}

export default Header;
