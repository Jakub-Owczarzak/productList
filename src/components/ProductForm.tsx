import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { createProductAsync, editProductAsync } from '../redux/actions/actionCreator';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { RootState } from '../redux/reducers';

type FormData = {
    name: string,
    quantity: number,
    description: string,
    email: string,
}

interface ProductFormProps {
    itemId?: string
}

const productSchema = yup.object({
    name: yup.string().required().min(5),
    quantity: yup.number().integer().notRequired(),
    description: yup.string(),
    email: yup.string().required().email()
})

const ProductForm = ({ itemId }: ProductFormProps): JSX.Element => {
    const dispatch = useDispatch();

    const productFromRedux = useSelector((state: RootState) => state.products.products.find(el => el.id.toString() === itemId))

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(productSchema), defaultValues:
            itemId ? productFromRedux : {}
    });

    const onSubmit = handleSubmit(data => {
        if (itemId) {
            const editedItem = { ...data, id: parseInt(itemId), date: new Date() }
            dispatch(editProductAsync(editedItem))
            console.log(data);
            return;
        }
        const newProduct = { ...data, date: new Date() };
        dispatch(createProductAsync(newProduct))
    });

    return (
        <form onSubmit={onSubmit}>
            <label> Name</label>
            <input {...register("name")} />
            <p>{errors.name?.message}</p>
            <label>Quantity</label>
            <input type="number" {...register("quantity")} />
            <p>{errors.quantity?.message}</p>
            <label>Description</label>
            <input {...register("description")} />
            <p>{errors.description?.message}</p>
            <label>Email</label>
            <input {...register("email")} />
            <p>{errors.email?.message}</p>
            <button
                type="submit"
            >
                SetValue
            </button>
        </form>
    );
}

export default ProductForm;