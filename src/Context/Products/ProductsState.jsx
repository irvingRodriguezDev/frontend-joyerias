import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import { GET_ALL_PRODUCTS, GET_ONE_PRODUCT, STORE_PRODUCT } from "../../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ProductsReducer from "./ProductsReducer";
import ProductsContext from "./ProductsContext";
const ProductsState = ({ children }) => {
  const initialState = {
    products: [],
    product: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getAllProducts = (page, rowsPerPage) => {
    let url = `/products?page=${page}&limit=${rowsPerPage}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: {
            data: res.data.data,
            total: res.data.total,
            page: res.data.current_page,
            perPage: res.data.per_page,
          },
        });
      })
      .catch((error) => {
        console.log(error, "ocurrió un error al obtener los productos");
      });
  };

  const storeProduct = (data) => {
    let url = "/products";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_PRODUCT,
          payload: res.data,
        });
        Swal.fire({
          title: "Exito",
          text: "El producto se ha creado de manera exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/productos");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear el producto");
      });
  };

  const getOneProduct = (id) => {
    let url = `/products/${id}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ONE_PRODUCT,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener el show del producto");
      });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        product: state.product,
        getOneProduct,
        getAllProducts,
        storeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
