import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";

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

const QuotationStatusForm = ({ quotation, onSubmit }) => {
  const [newStatus, setNewStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const allowedStatuses = VALID_TRANSITIONS[quotation?.status] ?? [];

  if (allowedStatuses.length === 0) return null;

  const handleSubmit = () => {
    if (!newStatus) return;
    const data = { status: newStatus };
    if (totalPrice) data.totalPrice = totalPrice;
    if (expiresAt) data.expiresAt = expiresAt;
    onSubmit(data);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.07)",
        mt: 3,
      }}
    >
      <Typography
        variant='subtitle2'
        fontWeight={700}
        color='rgba(38,89,139,0.9)'
        sx={{ mb: 2 }}
      >
        Actualizar status
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          select
          label='Nuevo status'
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          size='small'
          fullWidth
        >
          {allowedStatuses.map((s) => (
            <MenuItem key={s} value={s}>
              {STATUS_LABELS[s] ?? s}
            </MenuItem>
          ))}
        </TextField>

        {/* Solo mostramos precio y vigencia si el status es "sent" */}
        {newStatus === "sent" && (
          <>
            <TextField
              label='Precio total (MXN)'
              type='number'
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              size='small'
              fullWidth
            />
            <TextField
              label='Vigencia'
              type='datetime-local'
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              size='small'
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}

        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!newStatus}
          sx={{
            borderRadius: "10px",
            backgroundColor: "rgba(38,89,139,0.9)",
            "&:hover": { backgroundColor: "rgba(38,89,139,1)" },
          }}
        >
          Actualizar
        </Button>
      </Box>
    </Paper>
  );
};

export default QuotationStatusForm;
