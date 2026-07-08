import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Collapse,
  Stack,
  Chip,
  InputAdornment,
} from "@mui/material";
import dayjs from "dayjs";
import { Navigate, useNavigate } from "react-router-dom";
const VALID_TRANSITIONS = {
  pending: ["sent", "spam", "rejected"],
  sent: ["accepted", "rejected", "expired"],
  accepted: ["rejected"],
  rejected: [],
  expired: [],
  spam: [],
};

const STATUS_LABELS = {
  sent: "Enviada",
  accepted: "Aceptada",
  rejected: "Rechazada",
  expired: "Expirada",
  spam: "Spam",
};

// Estilo de inputs planos, robustos y corporativos
const inputSx = {
  "& .MuiOutlinedInput-root": {
    fontFamily: "'Jost', sans-serif",
    borderRadius: "12px",
    background: "#F8FAFC",
    "& fieldset": { borderColor: "rgba(1,82,140,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(1,82,140,0.3)" },
    "&.Mui-focused fieldset": {
      borderColor: "#01528C",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Jost', sans-serif",
    color: "rgba(1,82,140,0.6)",
    "&.Mui-focused": { color: "#01528C" },
  },
};

const QuotationStatusForm = ({ quotation, onSubmit }) => {
  const [newStatus, setNewStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const navigate = useNavigate();
  const allowedStatuses = VALID_TRANSITIONS[quotation?.status] ?? [];

  if (allowedStatuses.length === 0) return null;

  const handleSubmit = () => {
    if (!newStatus) return;
    const data = { status: newStatus };
    if (totalPrice) data.totalPrice = totalPrice;
    if (expiresAt) data.expiresAt = expiresAt;
    onSubmit(data);
    navigate(-1);
  };

  // 🚀 Función para accesos rápidos de vigencia
  const setQuickDate = (daysToAdd) => {
    // Formato requerido por <input type="datetime-local" />: YYYY-MM-DDTHH:mm
    const dateStr = dayjs().add(daysToAdd, "day").format("YYYY-MM-DDTHH:mm");
    setExpiresAt(dateStr);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography
        variant='subtitle2'
        sx={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 700,
          color: "#01528C",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        ⚡ Actualizar Estado
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {/* SELECTOR DE ESTADO */}
        <TextField
          select
          label='Selecciona el nuevo estatus'
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          fullWidth
          sx={inputSx}
        >
          {allowedStatuses.map((s) => (
            <MenuItem
              key={s}
              value={s}
              sx={{ fontFamily: "'Jost', sans-serif" }}
            >
              {STATUS_LABELS[s] ?? s}
            </MenuItem>
          ))}
        </TextField>

        {/* 🪄 ANIMACIÓN CONDICIONAL PARA COSTO Y VIGENCIA */}
        <Collapse in={newStatus === "sent"}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 0.5 }}
          >
            <TextField
              label='Precio total'
              type='number'
              placeholder='0.00'
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              fullWidth
              sx={inputSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Typography sx={{ color: "#01528C", fontWeight: 600 }}>
                      $
                    </Typography>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography
                      sx={{ fontSize: "12px", color: "text.secondary" }}
                    >
                      MXN
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />

            <Box>
              <TextField
                label='Vigencia de la tarifa'
                type='datetime-local'
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                fullWidth
                sx={inputSx}
                InputLabelProps={{ shrink: true }}
              />

              {/* CHIPS DE ACCESO RÁPIDO */}
              <Stack direction='row' spacing={1} sx={{ mt: 1.5 }}>
                <Typography
                  variant='caption'
                  sx={{
                    color: "text.secondary",
                    alignSelf: "center",
                    mr: 1,
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  Rápido:
                </Typography>
                <Chip
                  label='+3 Días'
                  size='small'
                  onClick={() => setQuickDate(3)}
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    backgroundColor: "rgba(1,82,140,0.06)",
                    color: "#01528C",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "rgba(1,82,140,0.12)" },
                  }}
                />
                <Chip
                  label='+7 Días'
                  size='small'
                  onClick={() => setQuickDate(7)}
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    backgroundColor: "rgba(163,187,19,0.15)",
                    color: "#7A8C0E",
                    fontWeight: 700,
                    "&:hover": { backgroundColor: "rgba(163,187,19,0.3)" },
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Collapse>

        {/* BOTÓN DE ACCIÓN PLANO */}
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!newStatus}
          disableElevation
          sx={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            py: 1.2,
            borderRadius: "12px",
            backgroundColor: "#01528C",
            textTransform: "none",
            transition: "all 0.2s ease",
            mt: 1,
            "&:hover": {
              backgroundColor: "#014270",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 16px rgba(1,82,140,0.2)",
            },
            "&:disabled": {
              backgroundColor: "#F1F5F9",
              color: "#94A3B8",
            },
          }}
        >
          {newStatus === "sent"
            ? "Actualizar y Notificar"
            : "Actualizar Estado"}
        </Button>
      </Box>
    </Box>
  );
};

export default QuotationStatusForm;
