import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Typography } from "@mui/material";
import ProductsContext from "../../Context/Products/ProductsContext";
import AuthContext from "../../Context/Auth/AuthContext";
import MethodGet from "../../config/Service";
const SelectProducts = (props) => {
  const { usuario } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    let url = "/productsSelect";
    MethodGet(url)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [usuario]);

  const detectarCambiosProduct = (value) => {
    props.detectarCambiosProduct(value);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#06121e" : "#06121e",
      boxShadow: state.isFocused ? "0 0 0 1px #06121e" : "none",
      "&:hover": {
        borderColor: "#06121e",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#06121e", // color del placeholder
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black", // texto seleccionado
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#06121e" : "#06121e",
      "&:hover": {
        color: "#06121e",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#06121e"
        : state.isFocused
        ? "#f0f0f0"
        : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: state.isSelected ? "#06121e" : "#f5f5f5",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  return (
    <>
      {/* <Typography textAlign={"start"}>Selecciona un producto</Typography> */}
      <Select
        onChange={detectarCambiosProduct}
        className='basic-single'
        classNamePrefix='select'
        styles={customStyles}
        name='select-state'
        placeholder='Selecciona un producto'
        options={
          products
            ? products.map((option) => ({
                label: `${option.clave}  ${option.description}`,
                value: `${option.id}`,
              }))
            : null
        }
      />
    </>
  );
};

export default SelectProducts;
