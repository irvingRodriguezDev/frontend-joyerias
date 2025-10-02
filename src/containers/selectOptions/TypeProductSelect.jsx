import React, { useEffect, useState } from "react";
import Select from "react-select";
import MethodGet from "../../config/Service";
import { Typography } from "@mui/material";
const TypeProductSelect = (props) => {
  const [typeProduct, setTypeProduct] = useState(null);

  useEffect(() => {
    if (typeProduct === null) {
      let url = "/typeProducts";
      MethodGet(url)
        .then((res) => {
          setTypeProduct(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }, []);
  console.log(typeProduct);

  const detectarCambiosTypeProduct = (value) => {
    props.detectarCambiosTypeProduct(value);
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
  };

  return (
    <>
      <Typography textAlign={"start"}>
        Selecciona un tipo de producto
      </Typography>
      <Select
        onChange={detectarCambiosTypeProduct}
        className='basic-single'
        classNamePrefix='select'
        styles={customStyles}
        name='select-state'
        placeholder='Selecciona un tipo de producto'
        options={
          typeProduct
            ? typeProduct.map((option) => ({
                label: `${option.name}`,
                value: `${option.id}`,
              }))
            : null
        }
      />
    </>
  );
};

export default TypeProductSelect;
