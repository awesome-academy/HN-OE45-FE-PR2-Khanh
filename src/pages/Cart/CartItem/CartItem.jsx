import React from 'react';
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import styles from '../Cart.module.sass'
import clsx from 'clsx'

function CartItem({item, stt, getCartDelete, toggleIsChangeQuantity, cartItems }) {
    const { name, image, id, price, quantity } = item
    
    function handleChangeQnt(e) {
        let value
        switch (e) {
            case 'increment': 
                value = quantity + 1
                break ;
            case 'decrement': 
                value = quantity > 1 ? quantity - 1 : quantity
                break ;
            default:
                value = isNaN(e.target.value) ? 1 : e.target.value
                break;
        }
        const newLocalCarts = updateCartList(id, value, cartItems)
        localStorage.setItem('local-cart', JSON.stringify(newLocalCarts))
        toggleIsChangeQuantity()
    }

    const updateCartList = (id, value, arr) => {
        return arr.map(cart => {
            if (cart.id === id) {
                return {...cart, quantity: value}
            }
            return cart 
        })
    }

    return (
        <tr>
            <td>{stt}</td>
            <td>
                <img alt={item.name} src={`./assets/images/${image}`} />
            </td>
            <td>{name}</td>
            <td>{price}$</td>
            <td>
                <button className={styles["btn-qnt"]}
                        onClick={()=>handleChangeQnt('decrement')}
                >
                    &#8722;
                </button>
                <input className={clsx(styles["input-qnt"], "w-50")} 
                    value={quantity} 
                    onChange={(e) => handleChangeQnt(e)}
                />
                <button className={styles["btn-qnt"]}
                        onClick={()=>handleChangeQnt('increment')}
                >
                    &#43;
                </button>
            </td>
            <td>{price * quantity}$</td>
            <td>
                <DeleteBinLineIcon
                    className={styles['delete-icon']}
                    onClick={()=>getCartDelete(id)}
                />
            </td>
        </tr>
    );
}

export default CartItem;
