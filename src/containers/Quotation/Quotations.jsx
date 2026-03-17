import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import QuotationList from "../../components/Qoutations/QoutationsList";
import QoutationContext from "../../Context/Quotation/QuotationContext";

const Quotations = () => {
  const { qoutations, getAllQoutationsPending } = useContext(QoutationContext);

  useEffect(() => {
    getAllQoutationsPending();
  }, []);

  const handleView = (quotation) => {
    console.log("ver", quotation);
  };

  const handleEdit = (quotation) => {
    console.log("gestionar", quotation);
  };

  return (
    <Layout>
      <Box sx={{ mt: 10 }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant='h5' fontWeight={600} color='#fff'>
            Cotizaciones
          </Typography>
          <Typography variant='body2' color='rgba(255,255,255,0.6)'>
            {qoutations?.length ?? 0} registros
          </Typography>
        </Box>

        <QuotationList quotations={qoutations ?? []} onEdit={handleEdit} />
      </Box>
    </Layout>
  );
};

export default Quotations;
