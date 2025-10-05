import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { Typography } from "@mui/material";
import BusinessRuleContext from "../../Context/BusinessRule/BusinessRuleContext";
const BusinessSelect = (props) => {
  const { business_rules, getAllBusiness } = useContext(BusinessRuleContext);
  useEffect(() => {
    getAllBusiness();
  }, []);
  const detectarCambiosBusiness = (value) => {
    props.detectarCambiosBusiness(value);
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
        Selecciona una regla de negocio
      </Typography>
      <Select
        onChange={detectarCambiosBusiness}
        className='basic-single'
        classNamePrefix='select'
        styles={customStyles}
        name='select-state'
        placeholder='Selecciona una regla de negocio'
        options={
          business_rules
            ? business_rules.map((option) => ({
                label: `${option.operator} - ${option.multiplicator} - ${option.percent_discount}`,
                value: `${option.id}`,
              }))
            : null
        }
      />
    </>
  );
};

export default BusinessSelect;
