import React from 'react';
import { useParams } from 'react-router-dom';

import ProductForm from '../components/ProductForm/ProductForm';

const EditProductPage: React.FC = (): JSX.Element => {
    const { id } = useParams();
    return (
        <>
            <ProductForm itemId={id} />
        </>
    )
}

export default EditProductPage;
