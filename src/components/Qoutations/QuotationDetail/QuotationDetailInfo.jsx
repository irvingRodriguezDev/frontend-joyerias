import React from "react";
import { Box, Typography, Chip, Divider, Grid, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  STATUS_CONFIG,
  TRIP_LABEL,
  formatDate,
  formatPrice,
} from "../quotation.helpers";

const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
    <Box sx={{ color: "rgba(38,89,139,0.6)", mt: 0.3 }}>{icon}</Box>
    <Box>
      <Typography variant='caption' color='text.secondary'>
        {label}
      </Typography>
      <Typography variant='body2' fontWeight={600} color='text.primary'>
        {value ?? "—"}
      </Typography>
    </Box>
  </Box>
);

const QuotationDetailInfo = ({ quotation }) => {
  if (!quotation) return null;
  const statusCfg = STATUS_CONFIG[quotation.status] ?? STATUS_CONFIG.pending;

  return (
    <Box>
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant='h6' fontWeight={700} color='text.primary'>
          {quotation.quoteNumber}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            label={TRIP_LABEL[quotation.tripType] ?? quotation.tripType}
            size='small'
            sx={{
              backgroundColor: "rgba(38,89,139,0.08)",
              color: "rgba(38,89,139,0.9)",
              fontWeight: 600,
              borderRadius: "8px",
            }}
          />
          <Chip
            label={statusCfg.label}
            size='small'
            sx={{
              backgroundColor: statusCfg.bg,
              color: statusCfg.color,
              fontWeight: 600,
              borderRadius: "8px",
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Datos del contratador */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <Typography
              variant='subtitle2'
              fontWeight={700}
              color='rgba(38,89,139,0.9)'
              sx={{ mb: 2 }}
            >
              Datos del contratador
            </Typography>
            <InfoRow
              icon={<PersonIcon fontSize='small' />}
              label='Nombre completo'
              value={quotation.contractorName}
            />
            <InfoRow
              icon={<PhoneIcon fontSize='small' />}
              label='WhatsApp'
              value={quotation.contractorPhone}
            />
            <InfoRow
              icon={<EmailIcon fontSize='small' />}
              label='Correo electrónico'
              value={quotation.contractorEmail}
            />
          </Paper>
        </Grid>

        {/* Datos del viaje */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <Typography
              variant='subtitle2'
              fontWeight={700}
              color='rgba(38,89,139,0.9)'
              sx={{ mb: 2 }}
            >
              Datos del viaje
            </Typography>
            <InfoRow
              icon={<PlaceIcon fontSize='small' />}
              label='Origen'
              value={quotation.origin}
            />
            <InfoRow
              icon={<PlaceIcon fontSize='small' />}
              label='Destino'
              value={quotation.destination}
            />
            <InfoRow
              icon={<DirectionsBusIcon fontSize='small' />}
              label='Tipo de unidad'
              value={quotation.unitType?.name}
            />
            <InfoRow
              icon={<CalendarMonthIcon fontSize='small' />}
              label='Fecha de salida'
              value={formatDate(quotation.departureAt)}
            />
            {quotation.returnAt && (
              <InfoRow
                icon={<CalendarMonthIcon fontSize='small' />}
                label='Fecha de regreso'
                value={formatDate(quotation.returnAt)}
              />
            )}
          </Paper>
        </Grid>

        {/* Descripción */}
        {quotation.description && (
          <Grid size={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <Typography
                variant='subtitle2'
                fontWeight={700}
                color='rgba(38,89,139,0.9)'
                sx={{ mb: 1.5 }}
              >
                Descripción
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <DescriptionIcon
                  fontSize='small'
                  sx={{ color: "rgba(38,89,139,0.6)", mt: 0.3 }}
                />
                <Typography variant='body2' color='text.secondary'>
                  {quotation.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Precio y vigencia */}
        {(quotation.totalPrice || quotation.expiresAt) && (
          <Grid size={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.07)",
                background: "rgba(38,89,139,0.03)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    Precio total
                  </Typography>
                  <Typography
                    variant='h5'
                    fontWeight={700}
                    color='rgba(38,89,139,0.9)'
                  >
                    {formatPrice(quotation.totalPrice) ?? "Sin asignar"}
                  </Typography>
                </Box>
                {quotation.expiresAt && (
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant='caption' color='text.secondary'>
                      Vigencia
                    </Typography>
                    <Typography variant='body2' fontWeight={600}>
                      {formatDate(quotation.expiresAt)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default QuotationDetailInfo;
