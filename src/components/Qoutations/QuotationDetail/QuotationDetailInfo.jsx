import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { formatDate, formatPrice } from "../quotation.helpers";

// Fila de información optimizada con la paleta e identidad premium
const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2.5 }}>
    <Box sx={{ color: "rgba(1, 82, 140, 0.4)", mt: 0.3, display: "flex" }}>
      {icon}
    </Box>
    <Box>
      <Typography
        variant='caption'
        sx={{
          fontFamily: "'Jost', sans-serif",
          color: "text.secondary",
          fontWeight: 500,
          display: "block",
          mb: 0.2,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant='body1'
        sx={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 600,
          color: "#1E293B",
        }}
      >
        {value ?? "—"}
      </Typography>
    </Box>
  </Box>
);

// Títulos de sección internos estilizados y planos
const SectionHeader = ({ title }) => (
  <Typography
    variant='subtitle2'
    sx={{
      fontFamily: "'Jost', sans-serif",
      fontWeight: 700,
      color: "#01528C",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      mb: 3,
    }}
  >
    {title}
  </Typography>
);

const QuotationDetailInfo = ({ quotation }) => {
  if (!quotation) return null;

  return (
    <Box>
      <Grid container spacing={{ xs: 3, md: 5 }}>
        {/* ── DATOS DEL CONTRATADOR ── */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionHeader title='👨‍💼 Datos del contratador' />
          <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
            <InfoRow
              icon={<PersonIcon fontSize='small' />}
              label='Nombre completo'
              value={quotation.contractorName}
            />
          </Grid>
          <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
            <InfoRow
              icon={<PhoneIcon fontSize='small' />}
              label='WhatsApp / Teléfono'
              value={quotation.contractorPhone}
            />
          </Grid>
          <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
            <InfoRow
              icon={<EmailIcon fontSize='small' />}
              label='Correo electrónico'
              value={quotation.contractorEmail}
            />
          </Grid>
        </Grid>

        {/* ── DATOS DEL VIAJE ── */}
        <Grid size={{ xs: 12, md: 8 }}>
          <SectionHeader title='🗺️ Itinerario del viaje' />
          <Grid container spacing={1}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <InfoRow
                icon={<PlaceIcon fontSize='small' />}
                label='Origen'
                value={quotation.origin}
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <InfoRow
                icon={<PlaceIcon fontSize='small' sx={{ color: "#A3BB13" }} />}
                label='Destino'
                value={quotation.destination}
              />
            </Grid>
          </Grid>
          <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
            <InfoRow
              icon={<DirectionsBusIcon fontSize='small' />}
              label='Tipo de unidad'
              value={quotation.unitType?.name}
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <InfoRow
                icon={<CalendarMonthIcon fontSize='small' />}
                label='Fecha de salida'
                value={formatDate(quotation.departureAt)}
              />
            </Grid>
            {quotation.returnAt && (
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <InfoRow
                  icon={<CalendarMonthIcon fontSize='small' />}
                  label='Fecha de regreso'
                  value={formatDate(quotation.returnAt)}
                />
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* ── DESCRIPCIÓN / DETALLES ADICIONALES ── */}
        {quotation.description && (
          <Grid size={12}>
            <Divider sx={{ borderColor: "rgba(1,82,140,0.06)", my: 1 }} />
            <Box sx={{ mt: 2 }}>
              <SectionHeader title='📝 Detalles solicitados' />
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  background: "#F8FAFC",
                  p: 2.5,
                  borderRadius: "12px",
                }}
              >
                <DescriptionIcon
                  fontSize='small'
                  sx={{ color: "rgba(1,82,140,0.4)", mt: 0.3 }}
                />
                <Typography
                  variant='body2'
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    color: "#475569",
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  {quotation.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}

        {/* ── INFORMACIÓN ECONÓMICA Y VIGENCIA ── */}
        {(quotation.totalPrice || quotation.expiresAt) && (
          <Grid item xs={12}>
            <Box
              sx={{
                p: 3,
                borderRadius: "14px",
                background: "rgba(163,187,19,0.03)",
                border: "1px dashed rgba(163,187,19,0.25)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LocalOfferIcon sx={{ color: "#A3BB13", fontSize: 28 }} />
                <Box>
                  <Typography
                    variant='caption'
                    sx={{
                      fontFamily: "'Jost', sans-serif",
                      color: "text.secondary",
                      fontWeight: 500,
                      display: "block",
                    }}
                  >
                    Costo Establecido
                  </Typography>
                  <Typography
                    variant='h4'
                    sx={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 700,
                      color: "#01528C",
                    }}
                  >
                    {formatPrice(quotation.totalPrice) ?? "Sin asignar tarifa"}
                  </Typography>
                </Box>
              </Box>

              {quotation.expiresAt && (
                <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                  <Typography
                    variant='caption'
                    sx={{
                      fontFamily: "'Jost', sans-serif",
                      color: "text.secondary",
                      fontWeight: 500,
                      display: "block",
                    }}
                  >
                    Vigencia de Tarifa
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 600,
                      color: "#1E293B",
                      mt: 0.5,
                    }}
                  >
                    ⏱️ Hasta el {formatDate(quotation.expiresAt)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default QuotationDetailInfo;
