import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, Typography } from "@mui/material";
import ClientsSelect from "../selectOptions/ClientsSelect";
import RadioSelect from "../../components/RadioSelect";
import ProductsOfSale from "./ProductsOfSale";
import Totals from "./Totals";
import Barcode from "./Barcode";
import ProductsSelect from "./SelectProducts";
import ModalAddClients from "../clients/ModalAddClients";
import PaymentsForm from "./PaymentsForm";
import SalesContext from "../../Context/Sales/SalesContext";
import AuthContext from "../../Context/Auth/AuthContext";
import BranchesSelect from "../selectOptions/BranchesSelect";
const AddSale = () => {
  const { usuario } = useContext(AuthContext);
  const { storeSale } = useContext(SalesContext);
  const ProductsSaleOnLocal = localStorage.getItem("productsSale");
  const [productsList, saveProductsList] = useState(
    ProductsSaleOnLocal ? JSON.parse(ProductsSaleOnLocal) : []
  );
  const [branch, setBranch] = useState(null);
  const [product, saveProduct] = useState("");
  const [productoID, guardarProductoID] = useState("");
  const [value, setValue] = useState("barcode");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //modal addclient
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [client, setClient] = useState(null);
  const detectarCambiosClient = (value) => {
    setClient(value.value);
  };

  const detectarCambiosBranch = (value) => {
    setBranch(value.value);
  };

  //pagos
  const [paymentCash, setPaymentCash] = useState(0);
  const [paymentCard, setPaymentCard] = useState(0);
  const [cardReference, setCardReference] = useState("");
  const [paymentTransfer, setPaymentTransfer] = useState(0);
  const [transferReference, setTransferReference] = useState("");

  //carrito
  const [subtotal, saveSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPaidOut, setTotalPaidOut] = useState(0);
  // 🔄 useEffect para recalcular totales cada vez que productsList cambie
  useEffect(() => {
    // Calcular subtotal (suma de productos)
    const subtotalCalculated = productsList.reduce((sum, p) => {
      const price = Number(p.final_price ?? p.price);
      const quantity = Number(p.quantity ?? 1);
      return sum + price * quantity;
    }, 0);

    // Calcular total pagado
    const totalPaid =
      Number(paymentCash) + Number(paymentCard) + Number(paymentTransfer);

    // Actualizar estados
    saveSubtotal(subtotalCalculated);
    setTotal(subtotalCalculated);
    setTotalPaidOut(totalPaid);
  }, [productsList, paymentCard, paymentCash, paymentTransfer]);

  const generatePaymentsArray = () => {
    const payments = [];

    // Si hay efectivo
    if (Number(paymentCash) > 0) {
      payments.push({
        amount: Number(paymentCash),
        payment_method: "cash",
        reference: "CAJA-001", // o lo que quieras generar dinámicamente
      });
    }

    // Si hay tarjeta
    if (Number(paymentCard) > 0) {
      payments.push({
        amount: Number(paymentCard),
        payment_method: "card",
        reference: cardReference || "TARJ-000",
      });
    }

    // Si hay transfer
    if (Number(paymentTransfer) > 0) {
      payments.push({
        amount: Number(paymentTransfer),
        payment_method: "transfer",
        reference: transferReference || "TRANS-000",
      });
    }

    return payments;
  };
  const handleCreateSale = () => {
    const payload = {
      client_id: client,
      branch_id: usuario.type_user_id === 1 ? branch : usuario.branch_id,
      user_id: 1,
      total: total, // calculado con useEffect
      paid_out: totalPaidOut, // sumatoria de pagos
      productsList: productsList.map((p) => ({
        product_id: p.product_id,
        final_price: Number(p.final_price ?? p.price),
        price_purchase: p.price_purchase,
        quantity: p.quantity ?? 1,
      })),
      payments: generatePaymentsArray(),
    };

    storeSale(payload);
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography color='white' fontWeight='bold' fontSize='30px'>
            Registrar nueva venta
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
            <Grid container spacing={2}>
              {usuario.type_user_id === 1 && (
                <Grid size={12}>
                  <BranchesSelect
                    detectarCambiosBranch={detectarCambiosBranch}
                  />
                </Grid>
              )}
              <Grid size={8}>
                <ClientsSelect
                  detectarCambiosClient={detectarCambiosClient}
                  branch_id={
                    usuario.type_user_id === 3 ? usuario.branch_id : null
                  }
                />
              </Grid>
              <Grid sie={4}>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{ mt: 2.5 }}
                  onClick={handleClickOpen}
                >
                  Registrar cliente
                </Button>
              </Grid>
              <Grid size={12}>
                <RadioSelect
                  setValue={setValue}
                  handleChange={handleChange}
                  value={value}
                />
              </Grid>
              {value === "barcode" ? (
                <Grid size={12}>
                  <Barcode
                    productsList={productsList}
                    saveProductsList={saveProductsList}
                    product={product}
                    saveProduct={saveProduct}
                    guardarProductId={guardarProductoID}
                    branchId={branch}
                  />
                </Grid>
              ) : (
                <Grid size={12}>
                  <ProductsSelect
                    productsList={productsList}
                    saveProductsList={saveProductsList}
                    guardarProductId={guardarProductoID}
                    branchId={branch}
                  />
                </Grid>
              )}
              <Grid size={12}>
                <ProductsOfSale
                  productsList={productsList}
                  saveProductsList={saveProductsList}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <PaymentsForm
                paymentCard={paymentCard}
                paymentCash={paymentCash}
                setPaymentCard={setPaymentCard}
                setPaymentCash={setPaymentCash}
                setCardReference={setCardReference}
                cardReference={cardReference}
                paymentTransfer={paymentTransfer}
                setPaymentTransfer={setPaymentTransfer}
                transferReference={transferReference}
                setTransferReference={setTransferReference}
              />
            </Grid>
            <Grid size={12}>
              <Totals
                subtotal={subtotal}
                total={total}
                totalPaidOut={totalPaidOut}
                handleCreateSale={handleCreateSale}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ModalAddClients open={open} handleClose={handleClose} />
    </Layout>
  );
};

export default AddSale;
