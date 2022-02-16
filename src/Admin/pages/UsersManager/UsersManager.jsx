import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import styles from "./UsersManager.module.sass"
import { getAllUser, getPaginationUser, deleteUserItemDbJson, getUserDetailDbJson } from "../../../store/slices/UserSlice"
import { setCurrentPage } from "../../../store/slices/ProductSlice"
import { setIsOpenAddModal, setIsOpenEditModal } from "../../../store/slices/AdminSlice"
import { Table } from "react-bootstrap"
import UsersManagerData from "./UsersManagerData/UsersManagerData"
import Pagination from "../../../components/Pagination/Pagination"
import ModalAddUser from './ModalAddUSer/ModalAddUser'
import AddLineIcon from "remixicon-react/AddLineIcon"
import ModalEditUser from "./ModalEditUser/ModalEditUser"

function UsersManager() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { paginationUser } = useSelector(({user}) => user) 
    const { allUser, filterUser } = useSelector(({user}) => user)
    const { listAllUsers, isLoading } = allUser
    const isOpenEditModal = useSelector(state => state.admin.isOpenEditModal)
    const { _limit, _totalRows } =  paginationUser
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [idUserDelete, setIdUserDelete] = useState('')
    const isOpenAddModal = useSelector(state => state.admin.isOpenAddModal)

    useEffect(() => {
        dispatch(getAllUser(filterUser))
        dispatch(getPaginationUser({
            ...filterUser,
            _page: '',
            _limit: ''
        }))
    },[filterUser, dispatch])

    const getUserDelete = (id) => {
        setIsOpenConfirmModal(true)
        setIdUserDelete(id)
    }

    const getUserDeleteName = () => {
        const userDelete = listAllUsers.find(item => item.id === idUserDelete)
        return userDelete.fullName
    }

    const handleDelUser = () => {
        dispatch(deleteUserItemDbJson(idUserDelete))
        dispatch(getAllUser(filterUser))
        dispatch(setCurrentPage(1))
        setIsOpenConfirmModal(false)
    }

    const handleOpenAddModal = () => {
        dispatch(setIsOpenAddModal(true))
    }

    const getUserDetail = async (id) => {
        dispatch(setIsOpenEditModal(true))
        await dispatch(getUserDetailDbJson(id))
    }

    return (
        <section className={styles["user-manager__content"]}>
            <AddLineIcon className={styles["user-icon--add"]} onClick={handleOpenAddModal}/>
            {isOpenAddModal && <ModalAddUser />}
            {isOpenEditModal && <ModalEditUser />}
            {
                isOpenConfirmModal ?
                <Toast className={styles["toast"]}>
                    <Toast.Header>
                        <strong className="me-auto">{t('Confirm')}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <span>{`Delete "${getUserDeleteName()}" from User List`}</span>
                        <div className='del-option flex-center'>
                            <button className='me-3'
                                onClick={()=>handleDelUser()}>{t('Ok')}</button>
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
                        <th>{t("Full name")}</th>
                        <th>{t("Email")}</th>
                        <th>{t("Phone")}</th>
                        <th>{t("Password")}</th>
                        <th>{t("Role")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listAllUsers &&
                        listAllUsers.map((item, index) => {
                            return (
                                <UsersManagerData 
                                    item={item}
                                    key={index}
                                    getUserDelete={getUserDelete}
                                    getUserDetail={getUserDetail}
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
            <Pagination 
                _limit={_limit}
                _totalRows = {_totalRows}
            />
        </section>
    );
}

export default UsersManager;
