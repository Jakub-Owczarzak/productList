import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllProductsAsync } from '../redux/actions/actionCreator';
import { RootState } from '../redux/reducers';




const ProductsPage: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const products = useSelector((state: RootState) => state.products.products)

    const handleNavigate = (id?: number): void => {
        if (!id) {
            navigate("/create")
        } else {
            navigate(`/edit/${id}`)
        }
    }

    useEffect(() => {
        dispatch(fetchAllProductsAsync())
    }, [])

    return (
        <div>
            <button onClick={() => handleNavigate()}>Create</button>
            <button onClick={() => handleNavigate(4)}>Edit</button>
            <p>HELLO Products</p>
        </div>
    )
}

export default ProductsPage;
