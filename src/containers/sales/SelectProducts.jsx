import { Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SelectProducts from "../selectOptions/SelectProducts";
import ProductsContext from "../../Context/Products/ProductsContext";
import Swal from "sweetalert2";
const ProductsSelect = ({
  guardarProductId,
  productsList,
  saveProductsList,
}) => {
  const { products, getAllProducts } = useContext(ProductsContext);
  const [product, setProduct] = useState(null);
  const detectarCambiosProduct = (value) => {
    setProduct(value.value);
  };

  useEffect(() => getAllProducts, []);
  const AgregarProductoState = () => {
    if (product === null) {
      Swal.fire({
        title: "Error",
        text: "Primero selecciona un producto",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    if (product !== null) {
      var producto = [];
      producto = products.filter((p) => p.id === Number(product));

      if (!producto.length) {
        Swal.fire({
          title: "error",
          text: "Ocurrio un error al consultar la informacion del producto",
          icon: "error",
        });
      }
    }
    producto[0].value = producto[0].id;
    // guardarProductId(producto[0]);
    //obtener la posicion del producto
    const position = productsList
      .map(function (e) {
        return e.product_id;
      })
      .indexOf(producto[0].id);
    let productoResultado = {};
    productoResultado.clave = producto[0].clave;
    productoResultado.product_id = producto[0].id;
    productoResultado.description = producto[0].description;
    productoResultado.category = producto[0].category.name || "N/A";
    productoResultado.line = producto[0].line?.name || "N/A";
    productoResultado.price = Number(producto[0].price).toFixed(2);
    productoResultado.price_purchase = Number(
      producto[0].price_purchase
    ).toFixed(2);
    productoResultado.final_price = Number(producto[0].price).toFixed(2);
    productoResultado.price_with_discount = Number(
      producto[0].price_with_discount
    ).toFixed(2);
    productoResultado.weight = producto[0].weight;
    var exist = productsList.filter((p) => p.product_id === product);
    if (exist.length) {
      Swal.fire({
        title: "No permitido",
        icon: "error",
        text: "El producto ya ha sido agregado a la lista de productos, por favor modifica la cantidad si deseas agregar más productos!",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    if (position === -1) {
      productoResultado.product_id = producto[0].id;
      localStorage.setItem(
        "productsSale",
        JSON.stringify([productoResultado, ...productsList])
      );
      saveProductsList([productoResultado, ...productsList]);
      Swal.fire({
        title: "Agregado",
        text: "El producto se agregó correctamente!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setProduct(null);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <SelectProducts detectarCambiosProduct={detectarCambiosProduct} />
      </Grid>
      <Grid size={4}>
        <Button variant='contained' size='large' onClick={AgregarProductoState}>
          Agregar
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductsSelect;
