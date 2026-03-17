import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "../../Layout/Layout";
import QuotationDetailInfo from "./QuotationDetailInfo";
import QuotationStatusForm from "./QuotationStatusForm";
import QuotationDetailActions from "./QuotationDetailActions";
import QoutationContext from "../../../Context/Quotation/QuotationContext";

const QuotationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    quotation,
    customer,
    order,
    getQuotationById,
    updateQuotationStatus,
    promoteToCustomer,
    convertToOrder,
  } = useContext(QoutationContext);

  useEffect(() => {
    getQuotationById(id);
  }, [id]);

  const handleStatusSubmit = (data) => {
    updateQuotationStatus(id, data);
  };

  const handlePromote = () => {
    promoteToCustomer(id);
  };

  const handleConvert = () => {
    convertToOrder(id);
  };

  return (
    <Layout>
      <Box sx={{ mt: 10 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <IconButton
            onClick={() => navigate("/cotizaciones")}
            sx={{ color: "#fff" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h5' fontWeight={600} color='#fff'>
            Detalle de cotización
          </Typography>
        </Box>

        {!quotation ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Columna izquierda — info */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  p: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                }}
              >
                <QuotationDetailInfo quotation={quotation} />
              </Box>
            </Grid>

            {/* Columna derecha — acciones */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  p: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                }}
              >
                <QuotationStatusForm
                  quotation={quotation}
                  onSubmit={handleStatusSubmit}
                />
                <QuotationDetailActions
                  quotation={quotation}
                  customer={quotation.customer ?? customer}
                  order={quotation.order ?? order}
                  onPromote={handlePromote}
                  onConvert={handleConvert}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default QuotationDetail;
