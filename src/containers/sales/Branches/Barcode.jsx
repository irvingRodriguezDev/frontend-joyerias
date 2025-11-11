import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useDebounce } from "use-debounce";
import ProductsContext from "../../../Context/Products/ProductsContext";
import { useForm } from "react-hook-form";
import showToast from "../../../utils/ShowToast";
import MethodGet from "../../../config/Service";
const BarcodeAdmin = ({
  productsList,
  saveProductsList,
  guardarProductId,
  branch_id,
}) => {
  const [barcode, setBarcode] = useState("");
  const [debouncedBarcode] = useDebounce(barcode, 500);
  const [products, setProducts] = useState();

  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let url = `/productsAvailablePerBranch/${branch_id}`;
    MethodGet(url)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [branch_id]);

  useEffect(() => {
    if (debouncedBarcode) handleProductSearch(debouncedBarcode);
  }, [debouncedBarcode]);

  /**
   * 🔍 Busca el producto en la lista general
   */
  const handleProductSearch = (code) => {
    const foundProduct = products.find((p) => p.clave === code);

    if (!foundProduct) {
      showToast("error", "El producto no encontrado");
      setBarcode("");
      return;
    }

    // Evitar error si line o category no existen
    const productoResultado = {
      clave: foundProduct.clave,
      description: foundProduct.description || "",
      line: foundProduct.line?.name || "", // <- aquí se evita el fallo
      category: foundProduct.category?.name || "",
      product_id: foundProduct.id,
      weight: foundProduct.weight || "",
      price: Number(foundProduct.price).toFixed(2),
      final_price: Number(foundProduct.price).toFixed(2),
      price_purchase: Number(foundProduct.price_purchase).toFixed(2),
      price_with_discount: Number(foundProduct.price_with_discount).toFixed(2),
    };

    // Guardamos el ID de producto actual
    guardarProductId(foundProduct);

    // Revisar si ya existe en la lista actual
    const exists = productsList.some(
      (p) =>
        p.product_id === foundProduct.id || p.product_id === foundProduct._id
    );

    if (exists) {
      showToast("error", "El producto ya se encuentra en la lista");
      setBarcode("");
      return;
    }

    // Guardar en localStorage y actualizar lista
    const updatedList = [productoResultado, ...productsList];
    localStorage.setItem("productsSale", JSON.stringify(updatedList));
    saveProductsList(updatedList);

    showToast("success", "El producto se agregó correctamente");
    setBarcode("");
  };

  /**
   * 🎨 Helper para mostrar un Toast con estilos consistentes
   */

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ mt: 2 }}>
      <Grid size={12}>
        <TextField
          {...register("barcode", {
            required: "Este campo es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            maxLength: { value: 255, message: "Máximo 255 caracteres" },
            onChange: (e) => setBarcode(e.target.value),
          })}
          value={barcode}
          fullWidth
          label='Código de Barras'
          placeholder='Usa el lector de códigos de barras'
          variant='outlined'
          autoComplete='off'
          autoFocus
          error={!!errors.barcode}
          helperText={errors.barcode?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <QrCodeScannerIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box mt={1}>
          <Typography variant='caption' color='gray'>
            Escanea o escribe un código para buscar un producto
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BarcodeAdmin;
