import React from "react";
import SidebarAdmin from "./components/SidebarAdmin/SidebarAdmin"
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin"
import styles from "./Admin.module.sass"
import ProductsManager from "./pages/ProductsManager/ProductsManager";
import { Routes, Route } from "react-router-dom"
import UsersManager from "./pages/UsersManager/UsersManager";
import ToastNotify from "../components/ToastNotify/ToastNotify"
import { useSelector } from "react-redux"

function Admin() {
    const { type, message } = useSelector( state => state.notification) 

    return (
        <div className={styles["wrapper"]}>
            <SidebarAdmin />
            <div className={styles['admin-content']}>
                <div className={styles["toast"]}>
                    {
                        message && <ToastNotify type={type} message={message}/>
                    }
                </div>
                <HeaderAdmin />
                <Routes>
                    <Route path='products' element={<ProductsManager />} />
                    <Route path='users' element={<UsersManager />} />
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
