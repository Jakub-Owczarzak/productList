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
import { openNotificationModal } from "../../redux/actions/modalActionCreator";
import Input from "./Input/Input";

import styles from "./productForm.module.scss";
import Button from "../UI/Button/Button";

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
      if (data.length > 0) {
        dispatch(openNotificationModal("Product name must be unique!", true));
        return false;
      }

      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (itemId) {
      const editedItem = { ...data, id: parseInt(itemId), date: new Date() };
      dispatch(editProductAsync(editedItem));
      navigate("/");
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
    <form className={styles.formWrapper} onSubmit={onSubmit}>
      <Input
        name={"name"}
        register={register}
        type={"string"}
        errorType={errors.name?.message}
      />
      <Input
        name={"quantity"}
        register={register}
        type={"number"}
        errorType={errors.quantity?.message}
      />
      <Input
        name={"description"}
        register={register}
        type={"string"}
        errorType={errors.description?.message}
      />{" "}
      <Input
        name={"email"}
        register={register}
        type={"email"}
        errorType={errors.description?.message}
      />
      <div className={styles.buttonWrapper}>
        <Button
          type="previous"
          title="Back"
          actionHandler={() => navigate("/")}
        />
        <Button type="next" title={itemId ? "Edit" : "Add"} />
      </div>
    </form>
  );
};

export default ProductForm;
