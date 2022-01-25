import React from 'react';
import clsx from 'clsx'
import styles from './Brands.module.sass'

function Brands() {

    const listBrands = ['Sony', 'Apple', 'Dolce', 'Steam', 'Garena']

    return (
        <div className={styles["brands"]}>
            <h2>Brand:</h2>
            {
                listBrands.map((item, index) => {
                    return (
                        <div className={clsx(styles["form-check"], "d-flex")} key={index}>
                            <input className="form-check-input" type="checkbox" value={item} id={item} />
                            <label className="form-check-label" htmlFor={item}>
                                {item}
                            </label>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Brands;
