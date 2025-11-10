import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Grid, Paper, Typography } from "@mui/material";
import ClientsSelectAdmin from "../../selectOptions/Admin/ClientsSelectAdmin";
import { useParams } from "react-router-dom";

const AddSaleBranch = () => {
  const params = useParams;
  const { id } = params;
  const [client, setClient] = useState(null);
  const detectarCambiosClientAdmin = (value) => {
    setClient(value.value);
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontWeight='bold' fontSize='40px' color='white'>
            Registrar nueva venta
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Paper sx={{ padding: "20px", borderRadius: "10px" }}>
              <Grid container spacing={2}>
                <Grid size={8}>
                  <ClientsSelectAdmin
                    detectarCambiosClientAdmin={detectarCambiosClientAdmin}
                    branch_id={id}
                  />
                </Grid>
                {/* <Grid sie={4}>
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
                </Grid> */}
              </Grid>
            </Paper>
          </Grid>
          {/* <Grid size={4}>
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
          </Grid> */}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddSaleBranch;
