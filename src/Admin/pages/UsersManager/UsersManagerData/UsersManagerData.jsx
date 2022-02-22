import React from 'react';
import EditLineIcon from "remixicon-react/EditLineIcon"
import DeleteBin7LineIcon from "remixicon-react/DeleteBin7LineIcon"
import styles from "../UsersManager.module.sass"

function UserManagerData({item, getUserDelete, getUserDetail}) {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.fullName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.password}</td>
            <td>{item.role}</td>
            <td className={styles["manager-tools"]}>
                <EditLineIcon onClick={() => getUserDetail(item.id)}/>
                <DeleteBin7LineIcon onClick={() => getUserDelete(item.id)}/>
            </td>
        </tr>
    );
}

export default UserManagerData;