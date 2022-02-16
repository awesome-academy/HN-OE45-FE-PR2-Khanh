import React, { useState } from "react"
import AdminLineIcon from "remixicon-react/AdminLineIcon"
import SuitcaseLineIcon from "remixicon-react/SuitcaseLineIcon"
import UserLineIcon from "remixicon-react/UserLineIcon"
import styles from "./SidebarAdmin.module.sass"
import { Link } from "react-router-dom"

function Sidebar() {    
    const ADMIN_ITEM = [
        { 
            value: "Products",
            icon: SuitcaseLineIcon
        },
        {
            value: "Users",
            icon: UserLineIcon
        }
    ]
    const [adminItem, setAdminItem] = useState(null);
    let href = "/admin"

    return (
        <aside className={styles["manager-sidebar"]}>
            <ul className={styles["manager-list"]}>
                <Link to="/admin" className={styles["sidebar-name"]}>
                    <AdminLineIcon />
                    <span>Admin</span>
                </Link>
                <hr />
                <span className={styles["manager-title"]}>Manager</span>
                {
                    ADMIN_ITEM.map(({ value, icon: Icon } , index) => (       
                        <li className={styles["manager-item"]}
                            key={index}
                        >
                            <Link to={`${href}/${value}`} 
                                className={value === adminItem && styles["active"]}
                                onClick={() => setAdminItem(value)}
                            >
                                <Icon />
                                <span>{value}</span>
                            </Link>
                        </li>
                    ))
                }          
            </ul>
        </aside>
    );
}

export default Sidebar;