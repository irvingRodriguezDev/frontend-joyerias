import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Typography,
  Divider,
  Tooltip,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { PriceFormat } from "../../utils/PriceFormat";
import LinesContext from "../../Context/Lines/LinesContext";
const LinesCard = ({ line }) => {
  const { deleteLine } = useContext(LinesContext);
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "none",
            p: 2,
          }}
        >
          <CardContent>
            <Typography
              variant='h6'
              fontWeight='bold'
              color='primary.main'
              sx={{ mb: 1 }}
            >
              {line.name}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography variant='body1' color='text.secondary'>
                <strong>P. Compra:</strong>{" "}
                {PriceFormat(Number(line.price_purchase))}
              </Typography>

              <Typography variant='body1' color='text.secondary'>
                <strong>P. Venta:</strong> {PriceFormat(Number(line.price))}
              </Typography>

              <Typography variant='body1' color='text.secondary'>
                <strong>Descuento:</strong> {line.percent_discount} %
              </Typography>
            </Box>
          </CardContent>

          <Divider sx={{ mt: 1 }} />

          <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
            <Tooltip title='Editar línea' arrow>
              <IconButton
                sx={{
                  color: "warning.main",
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "0.2s",
                  },
                }}
              >
                <EditIcon width={30} />
              </IconButton>
            </Tooltip>

            <Tooltip title='Eliminar línea' arrow>
              <IconButton
                onClick={() => deleteLine(line.id)}
                sx={{
                  color: "error.main",
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "0.2s",
                  },
                }}
              >
                <DeleteIcon width={30} />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Paper>
    </motion.div>
  );
};

export default LinesCard;
