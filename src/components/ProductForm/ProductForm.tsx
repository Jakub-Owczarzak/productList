import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createProductAsync,
  editProductAsync,
} from "../../redux/actions/actionCreator";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api";
import { ProductsResponse } from "../../models/axiosResponse.interfaces";

type FormData = {
  name: string;
  quantity: number;
  description: string;
  email: string;
};

interface ProductFormProps {
  itemId?: string;
}

const productSchema = yup.object({
  name: yup.string().required().min(5).trim(),
  quantity: yup.number().integer().notRequired(),
  description: yup.string(),
  email: yup.string().required().email(),
});

const ProductForm = ({ itemId }: ProductFormProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productFromRedux = useSelector((state: RootState) =>
    state.products.products.find((el) => el.id.toString() === itemId)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(productSchema),
    defaultValues: itemId ? productFromRedux : {},
  });

  const handleCheckUniqueProduct = async (name: string) => {
    try {
      const { data } = await axios.get<ProductsResponse>(
        `/Products?filter[where][name]=${name}`
      );
      if (data.length > 0) return false;

      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (itemId) {
      const editedItem = { ...data, id: parseInt(itemId), date: new Date() };
      dispatch(editProductAsync(editedItem));
      return;
    }
    const newProduct = { ...data, date: new Date() };
    try {
      const isUnique = await handleCheckUniqueProduct(newProduct.name);
      if (isUnique) {
        dispatch(createProductAsync(newProduct));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
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
      <button type="submit">SetValue</button>
    </form>
  );
};

export default ProductForm;
