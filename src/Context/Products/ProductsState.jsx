import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_NO_PAGINATE,
  GET_ONE_PRODUCT,
  PRODUCTS_FOR_SELECT,
  STORE_PRODUCT,
} from "../../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ProductsReducer from "./ProductsReducer";
import ProductsContext from "./ProductsContext";
const ProductsState = ({ children }) => {
  const initialState = {
    products: [],
    product: [],
    ErrorsApi: [],
    total: 0,
    page: 0,
    perPage: 0,
    lastPage: 0,
    currentPage: 0,
    next_page_url: null,
    prev_page_url: null,
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const getAllProducts = (page, rowsPerPage) => {
    let url = `/products?page=${page}&rowsPerPage=${rowsPerPage}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: {
            data: res.data.products.data,
            total: res.data.products.total,
            page: res.data.products.current_page,
            perPage: res.data.products.per_page,
            next_page_url: res.data.products.next_page_url,
            prev_page_url: res.data.products.prev_page_url,
            lastPage: res.data.products.last_page,
            currentPage: res.data.products.current_page,
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

  const getAllProductsNoPaginate = () => {
    let url = "/productsNoPaginate";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_PRODUCTS_NO_PAGINATE,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener todos los productos");
      });
  };
  const productsForSelect = () => {
    let url = "/productsSelect";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: PRODUCTS_FOR_SELECT,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        product: state.product,
        total: state.total,
        perPage: state.perPage,
        page: state.page,
        lastPage: state.lastPage,
        currentPage: state.currentPage,
        next_page_url: state.next_page_url,
        prev_page_url: state.prev_page_url,
        getOneProduct,
        getAllProducts,
        storeProduct,
        getAllProductsNoPaginate,
        productsForSelect,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsState;
