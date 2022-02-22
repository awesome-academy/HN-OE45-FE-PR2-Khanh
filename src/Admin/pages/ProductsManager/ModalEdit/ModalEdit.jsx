import React, { useState } from "react";
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import Select from 'react-select';
import { Form, Button } from "react-bootstrap"
import styles from "./ModalEdit.module.sass"
import { setIsOpenEditModal } from "../../../../store/slices/AdminSlice";
import { setNotification } from "../../../../store/slices/NotificationSlice"
import { updateProductItemDbJson, getAllProducts } from "../../../../store/slices/ProductSlice"
import CloseLineIcon from "remixicon-react/CloseLineIcon"

function Modal() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formEdit = useSelector(state => state.admin.formEdit)
    const { id, name, desc, detail_desc, brand, type, categories, price, image, rating, label } = formEdit

    const categoriesDefault = { value: categories, label: categories }
    const ratingDefault = { value: rating, label: rating }
    const brandDefault = { value: brand, label: brand}
    const typeDefault = { value: type, label: type}
    const labelDefault = { value: label, label: label}

    const [brandItem, setBrandItem] = useState(brandDefault)
    const [typeItem, setTypeItem] = useState(typeDefault)
    const [categoriesItem, setCategoriesItem] = useState(categoriesDefault)
    const [ratingItem, setRatingItem] = useState(ratingDefault)
    const [labelItem, setLabelItem] = useState(labelDefault)
    const [idItem, setIdItem] = useState(id)
    const [nameItem, setNameItem] = useState(name)
    const [descItem, setDescItem] = useState(desc)
    const [detailDescItem, setDetailDescItem] = useState(detail_desc)
    const [priceItem, setPriceItem] = useState(price)
    const [imageItem, setImageItem] = useState(image)
    const filter = useSelector(state => state.products.filter)

    const brandLists = [
        { value: 'Youtobe', label: 'Youtobe' },
        { value: 'NetFlix', label: 'NetFlix' },
        { value: 'Spotify', label: 'Spotify' },
        { value: 'Steam', label: 'Steam' },
        { value: 'Adobe', label: 'Adobe' },
        { value: 'Discord', label: 'Discord' },
    ]
    const typeLists = [
        { value: 'Action', label: 'Action' },
        { value: '3D', label: '3D' },
        { value: 'Battle', label: 'Battle' },
        { value: 'Fps', label: 'Fps' },
        { value: 'Card', label: 'Card' },
        { value: 'Role Play', label: 'Role Play' },
        { value: 'Movie', label: 'Movie' },
        { value: 'Account', label: 'Account' },
        { value: 'Education', label: 'Education' },
        { value: 'Cd key', label: 'Cd key' },
    ]
    const categoriesLists = [
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Work', label: 'Work' },
        { value: 'Study', label: 'Study' },
        { value: 'Game Steam', label: 'Game Steam' },
        { value: 'Game Origin', label: 'Game Origin' },
        { value: 'Pubg', label: 'Pubg' },
        { value: 'Xbox gif Card', label: 'Xbox gif Card' },
    ]
    const ratingLists = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
    ]
    const labelLists = [
        { value: 'Sale off', label: 'Sale off' },
        { value: 'Features', label: 'Features'}
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateProductItemDbJson({id, newProductUpdate: {
            id: idItem,
            name: nameItem, 
            desc: descItem,
            detail_desc: detailDescItem, 
            price: priceItem, 
            image: imageItem, 
            brand: brandItem.value, 
            type: typeItem.value,
            categories: categoriesItem.value, 
            rating: ratingItem.value, 
            label: labelItem.value
        }}))
        dispatch(getAllProducts(filter))
        dispatch(setNotification({type: 'success', message: 'Product update successful'}))
        dispatch(setIsOpenEditModal(false))
    }

    const handleCloseModal = () => {
        dispatch(setIsOpenEditModal(false))
    }

    return (
        <section className={styles["modal-edit"]}>
            <div className="d-flex justify-content-between">
                <h2 className={styles["form-title"]}>{t("Modal")}</h2>
                <CloseLineIcon onClick={handleCloseModal} />
            </div>
            <Form className={styles["form-modal"]}>
                <Form.Group className={styles['form-gr']} controlId="id">
                    <Form.Label className={styles['form-label']}>Id :</Form.Label>
                    <Form.Control
                        className={styles['form-input']}
                        type="text"
                        name="id"
                        value={idItem}
                        disabled
                    />
                </Form.Group>
                <Form.Group className={styles['form-gr']} controlId="name">
                    <Form.Label className={styles['form-label']}>Name :</Form.Label>
                    <Form.Control
                        className={styles['form-input']}
                        type="text"
                        name="name"
                        value={nameItem}
                        onChange={(e) => setNameItem(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={styles['form-gr']} controlId="desc">
                    <Form.Label className={styles['form-label']}>Desc :</Form.Label>
                    <Form.Control
                        className={styles['form-input']}
                        type="text"
                        name="desc"
                        value={descItem}
                        onChange={(e) => setDescItem(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={styles['form-gr']} controlId="detailDesc">
                    <Form.Label className={styles['form-label']}>Detail desc :</Form.Label>
                    <Form.Control
                        className={styles['form-input']}
                        type="text"
                        as="textarea"
                        name="detailDesc"
                        value={detailDescItem}
                        onChange={(e) => setDetailDescItem(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={styles['form-gr']} controlId="price">
                    <Form.Label className={styles['form-label']}>Price :</Form.Label>
                    <Form.Control
                        className={styles['form-input']}
                        type="text"
                        name="price"
                        value={priceItem}
                        onChange={(e) => setPriceItem(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={styles['form-gr']} controlId="image">
                    <Form.Label className={styles['form-label']}>Image :</Form.Label>
                    <Form.Control
                        className={styles['form-input']}
                        type="text"
                        name="image"
                        value={imageItem}
                        onChange={(e) => setImageItem(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='select'>
                    <Form.Label className={styles['form-label']}>{t('Brand')} :</Form.Label>
                    <Select
                        className={styles['form-select']}
                        defaultValue={brandItem}
                        onChange={setBrandItem}
                        options={brandLists}
                    />   
                </Form.Group> 
                <Form.Group controlId='select'>
                    <Form.Label className={styles['form-label']}>{t('Type')} :</Form.Label>
                    <Select
                        className={styles['form-select']}
                        defaultValue={typeItem}
                        onChange={setTypeItem}
                        options={typeLists}
                    />   
                </Form.Group> 
                <Form.Group controlId='select'>
                    <Form.Label className={styles['form-label']}>{t('Categories')} :</Form.Label>
                    <Select
                        className={styles['form-select']}
                        defaultValue={categoriesItem}
                        onChange={setCategoriesItem}
                        options={categoriesLists}
                    />   
                </Form.Group> 
                <Form.Group controlId='select'>
                    <Form.Label className={styles['form-label']}>{t('Rating')} :</Form.Label>
                    <Select
                        className={styles['form-select']}
                        defaultValue={ratingItem}
                        onChange={setRatingItem}
                        options={ratingLists}
                    />   
                </Form.Group> 
                <Form.Group controlId='select'>
                    <Form.Label className={styles['form-label']}>{t('Label')} :</Form.Label>
                    <Select
                        className={styles['form-select']}
                        defaultValue={labelItem}
                        onChange={setLabelItem}
                        options={labelLists}
                    />   
                </Form.Group> 
                <Button variant="outline-primary" type="submit" size="lg" onClick={handleSubmit}>Submit</Button>
            </Form>
        </section>
    );
}

export default Modal;
