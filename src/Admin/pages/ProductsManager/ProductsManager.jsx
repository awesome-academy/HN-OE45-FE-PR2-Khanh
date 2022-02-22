import React, { useEffect, useState } from 'react';
import styles from './ProductsManager.module.sass'
import { useTranslation } from "react-i18next"
import { Table } from "react-bootstrap"
import { getAllProducts, getPagination, deleteProductItemDbJson, setCurrentPage } from "../../../store/slices/ProductSlice"
import { useDispatch, useSelector } from "react-redux"
import { Toast } from 'react-bootstrap'
import  Pagination from "../../../components/Pagination/Pagination"
import ProductsManagerData from './ProductsManagerData/ProductsManagerData';
import ModalEdit from "./ModalEdit/ModalEdit"
import AddLineIcon from "remixicon-react/AddLineIcon"
import { setIsOpenAddModal } from "../../../store/slices/AdminSlice"
import ModalAdd from './ModalAdd/ModalAdd';

function ProductsManager() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { filter, allProducts } = useSelector(({products}) => products) 
    const { listAllProducts, isLoading } = allProducts
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [idProductDelete, setIdProductDelete] = useState('')
    const isOpenEditModal = useSelector(state => state.admin.isOpenEditModal)
    const isOpenAddModal = useSelector(state => state.admin.isOpenAddModal)
    const pagination = useSelector( state => state.products.pagination)
    const { _limit, _totalRows } = pagination
    
    useEffect(() => {
        dispatch(getAllProducts(filter))
        dispatch(getPagination({
            ...filter,
            _page: '',
            _limit: ''
        }))
    },[filter])

    const getProductDelete = (id) => {
        setIsOpenConfirmModal(true)
        setIdProductDelete(id)
    }

    const getProductDeleteName = () => {
        const productDelete = listAllProducts.find(item => item.id === idProductDelete)
        return productDelete.name
    }

    const handleDelProduct = () => {
        dispatch(deleteProductItemDbJson(idProductDelete))
        dispatch(getAllProducts(filter))
        setIsOpenConfirmModal(false)
    }

    const handleOpenAddModal = () => {
        dispatch(setIsOpenAddModal(true))
    }

    return (
        <section className={styles["product-manager__content"]}>
            <AddLineIcon className={styles["product-icon--add"]} onClick={handleOpenAddModal}/>
            {isOpenAddModal && <ModalAdd />}
            {isOpenEditModal && <ModalEdit />}
            {
                isOpenConfirmModal ?
                <Toast className={styles["toast"]}>
                    <Toast.Header>
                        <strong className="me-auto">{t('Confirm')}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <span>{`Delete "${getProductDeleteName()}" from Product List`}</span>
                        <div className='del-option flex-center'>
                            <button className='me-3'
                                onClick={()=>handleDelProduct()}>{t('Ok')}</button>
                            <button
                                onClick={()=>setIsOpenConfirmModal(false)}>{t('Cancle')}</button>
                        </div>
                    </Toast.Body>
                </Toast>
                : null
            }
            <Table bordered className={styles["table-cart"]}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>{t("Image")}</th>
                        <th>{t("Name")}</th>
                        <th>{t("Price")}</th>
                        <th>{t("Desc")}</th>
                        <th>{t("Brand")}</th>
                        <th>{t("Type")}</th>
                        <th>{t("Categories")}</th>
                        <th>{t("Tools")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listAllProducts &&
                        listAllProducts.map((item, index) => {
                            return (
                                <ProductsManagerData 
                                    item={item}
                                    key={index}
                                    getProductDelete={getProductDelete}
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
            <Pagination 
                _limit= {_limit}
                _totalRows = {_totalRows}
            />
        </section>
    );
}

export default ProductsManager;
