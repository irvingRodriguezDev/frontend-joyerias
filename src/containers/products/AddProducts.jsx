import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import CategorySelect from "../selectOptions/CategorySelect";
import LineSelect from "../selectOptions/LineSelect";
import BranchesSelect from "../selectOptions/BranchesSelect";
import MethodGet from "../../config/Service";
import { useForm, Controller } from "react-hook-form";

const AddProducts = () => {
  const [infoCategory, setInfoCategory] = useState(null);
  const [infoLine, setInfoLine] = useState(null);
  const [category, setCategory] = useState(null);
  const [line, setLine] = useState(null);
  const [branch, setBranch] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clave: "",
      descripcion: "",
      gramos: "",
      price_purchase: "",
      price_publico: "",
      price_discount: "",
      observaciones: "",
    },
  });

  const pricePurchase = watch("price_purchase");
  const gramos = watch("gramos");

  // Detectar cambios desde selects
  const detectarCambiosCategory = (value) => setCategory(value.value);
  const detectarCambiosLines = (value) => setLine(value.value);
  const detectarCambiosBranch = (value) => setBranch(value.value);

  // Obtener info de categoría seleccionada
  useEffect(() => {
    if (category !== null) {
      MethodGet(`/category/${category}`)
        .then((res) => setInfoCategory(res.data))
        .catch((err) => console.log("Error al obtener categoría", err));
    }
  }, [category]);

  // Obtener info de línea seleccionada
  useEffect(() => {
    if (line !== null) {
      MethodGet(`/lines/${line}`)
        .then((res) => setInfoLine(res.data))
        .catch((err) => console.log("Error al obtener línea", err));
    }
  }, [line]);

  // --- Funciones de cálculo ---
  const calculatePriceForPzas = (pricePurchase) => {
    if (!infoCategory?.business_rule) {
      console.warn("No hay regla de negocio asociada");
      return { price: 0, priceDiscount: 0 };
    }

    const { multiplicator, operator, percent_discount } =
      infoCategory.business_rule;

    const multiplicatorNum = Number(multiplicator) || 1;
    const percentDiscount = Number(percent_discount) || 0;

    let price = pricePurchase;

    // 🔹 Aplica el operador según corresponda
    switch (operator) {
      case "*":
        price = pricePurchase * multiplicatorNum;
        break;
      case "+":
        price = pricePurchase + multiplicatorNum;
        break;
      default:
        console.warn("Operador no reconocido, usando precio base");
        price = pricePurchase;
    }

    const priceDiscount = price - (price * percentDiscount) / 100;

    return {
      price: Number(price.toFixed(2)),
      priceDiscount: Number(priceDiscount.toFixed(2)),
    };
  };

  const CalculatePriceForGrs = (gramos) => {
    const price_purchase_line = Number(infoLine?.price_purchase);
    const price_line = Number(infoLine?.price);
    const percent_discount_line = Number(infoLine?.percent_discount);

    const price_purchase = gramos * price_purchase_line;
    const price_venta = gramos * price_line;
    const price_discount_line =
      price_venta - (price_venta * percent_discount_line) / 100;

    return {
      price_purchase_final: Number(price_purchase.toFixed(2)),
      price_venta_final: Number(price_venta.toFixed(2)),
      price_discount_final: Number(price_discount_line.toFixed(2)),
    };
  };

  // --- Ejecutar cálculos automáticos ---
  useEffect(() => {
    if (infoCategory?.type_product?.id === 1 && pricePurchase) {
      const { price, priceDiscount } = calculatePriceForPzas(
        Number(pricePurchase)
      );
      setValue("price_publico", price);
      setValue("price_discount", priceDiscount);
    }
  }, [pricePurchase, infoCategory]);

  useEffect(() => {
    if (infoCategory?.type_product?.id === 2 && gramos && infoLine) {
      const { price_purchase_final, price_venta_final, price_discount_final } =
        CalculatePriceForGrs(Number(gramos));

      setValue("price_purchase", price_purchase_final);
      setValue("price_publico", price_venta_final);
      setValue("price_discount", price_discount_final);
    }
  }, [gramos, infoLine, infoCategory]);

  // --- Envío del formulario ---
  const onSubmit = (data) => {
    console.log("Datos del producto:", data);
    // Aquí iría tu lógica para enviar la información a la API
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid size={12}>
            <Typography fontWeight='bold' fontSize='30px' color='white'>
              Registrar nuevo producto
            </Typography>
          </Grid>

          <Grid size={8}>
            <Paper sx={{ padding: "20px" }}>
              <Grid container spacing={2}>
                {/* CATEGORY SELECT */}
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <CategorySelect
                    detectarCambiosCategory={detectarCambiosCategory}
                  />
                </Grid>

                {/* CLAVE */}
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <Controller
                    name='clave'
                    control={control}
                    rules={{ required: "La clave es obligatoria" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Clave'
                        fullWidth
                        placeholder='M10KITA001'
                        error={!!errors.clave}
                        helperText={errors.clave?.message}
                      />
                    )}
                  />
                </Grid>

                {/* DESCRIPCIÓN */}
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <Controller
                    name='descripcion'
                    control={control}
                    rules={{ required: "La descripción es obligatoria" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Descripción'
                        fullWidth
                        placeholder='Sirconia'
                        error={!!errors.descripcion}
                        helperText={errors.descripcion?.message}
                      />
                    )}
                  />
                </Grid>

                {/* LINE SELECT (solo si no hay business rule) */}
                {infoCategory?.business_rule === null && (
                  <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                    <LineSelect detectarCambiosLines={detectarCambiosLines} />
                  </Grid>
                )}

                {/* GRAMOS (solo si tipo_producto = 2) */}
                {infoCategory?.type_product?.id === 2 && (
                  <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                    <Controller
                      name='gramos'
                      control={control}
                      rules={{ required: "Ingresa los gramos" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label='Gramos'
                          fullWidth
                          type='number'
                          placeholder='1.2'
                          error={!!errors.gramos}
                          helperText={errors.gramos?.message}
                        />
                      )}
                    />
                  </Grid>
                )}

                {/* PRECIO COMPRA */}
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <Controller
                    name='price_purchase'
                    control={control}
                    rules={{ required: "El precio de compra es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Precio compra'
                        fullWidth
                        type='number'
                        placeholder='1.2'
                        disabled={infoCategory?.type_product?.id !== 1}
                        error={!!errors.price_purchase}
                        helperText={errors.price_purchase?.message}
                      />
                    )}
                  />
                </Grid>

                {/* PRECIO PÚBLICO */}
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <Controller
                    name='price_publico'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Precio público'
                        fullWidth
                        type='number'
                        disabled
                      />
                    )}
                  />
                </Grid>

                {/* PRECIO CON DESCUENTO */}
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <Controller
                    name='price_discount'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Precio con descuento'
                        fullWidth
                        type='number'
                        disabled
                      />
                    )}
                  />
                </Grid>

                {/* OBSERVACIONES */}
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <Controller
                    name='observaciones'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Observaciones'
                        fullWidth
                        placeholder='Detalles adicionales'
                      />
                    )}
                  />
                </Grid>

                {/* SUCURSAL */}
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <BranchesSelect
                    detectarCambiosBranch={detectarCambiosBranch}
                  />
                </Grid>

                {/* BOTÓN GUARDAR */}
                <Grid
                  size={12}
                  sx={{ display: "flex", justifyContent: "end", mt: 2 }}
                >
                  <Button variant='contained' size='large' type='submit'>
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default AddProducts;
