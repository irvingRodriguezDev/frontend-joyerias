import React, { useEffect, useState } from "react";
import Select from "react-select";
import MethodGet from "../../../config/Service";
const SelectProductsAdmin = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let url = `/productsAvailablePerBranch/${props.branch_id}`;
    MethodGet(url)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(
          error,
          "ocurrio un error al obtener productos disponibles por sucursal"
        );
      });
  }, [props.branch_id]);
  const detectarCambiosProductAdmin = (value) => {
    props.detectarCambiosProductAdmin(value);
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
        onChange={detectarCambiosProductAdmin}
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

export default SelectProductsAdmin;
