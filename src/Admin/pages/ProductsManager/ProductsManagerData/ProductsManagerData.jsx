import React from 'react';
import EditLineIcon from "remixicon-react/EditLineIcon"
import DeleteBin7LineIcon from "remixicon-react/DeleteBin7LineIcon"
import { setFormEdit } from "../../../../store/slices/AdminSlice"
import { useDispatch } from 'react-redux'
import { setIsOpenEditModal } from "../../../../store/slices/AdminSlice"
import styles from "../ProductsManager.module.sass"

function ProductsManagerData({item, getProductDelete}) {
    const dispatch = useDispatch()
    const handleSetFormEdit = (item) => {
        dispatch(setFormEdit(item))
        dispatch(setIsOpenEditModal(true))
    }   

    return (
        <tr>
            <td>{item.id}</td>
            <td className={styles["product-img"]}>
                <img alt={item.name} src={`../assets/images/${item.image}`} />
            </td>
            <td>{item.name}</td>
            <td>{item.price}$</td>
            <td>{item.desc}</td>
            <td>{item.brand}</td>
            <td>{item.type}</td>
            <td>{item.categories}</td>
            <td className={styles["manager-tools"]}>
                <EditLineIcon onClick={() => handleSetFormEdit(item)}/>
                <DeleteBin7LineIcon onClick={() => getProductDelete(item.id)}/>
            </td>
        </tr>
    );
}

export default ProductsManagerData;