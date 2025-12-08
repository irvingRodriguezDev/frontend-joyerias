import React, { useContext } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  Box,
  Pagination,
  Chip,
  Button,
} from "@mui/material";
import FormatDate from "../../utils/FormatDate";
import TransferContext from "../../Context/Transfer/TransferContext";
const STATUS = {
  1: { label: "Enviado", color: "warning" },
  2: { label: "Aceptado", color: "success" },
  3: { label: "Rechazado", color: "error" },
  4: { label: "Cancelado", color: "default" },
};

const TableTransferOutgoing = ({
  transfersOutgoing,
  pagination,
  onPageChange,
}) => {
  const { respondTransfer } = useContext(TransferContext);
  return (
    <Box>
      {/* Tabla */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#173757" }}>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>producto</TableCell>
              <TableCell sx={{ color: "white" }}>Descrip.</TableCell>
              <TableCell sx={{ color: "white" }}>Categoría</TableCell>
              <TableCell sx={{ color: "white" }}>Línea</TableCell>
              <TableCell sx={{ color: "white" }}>Peso</TableCell>
              <TableCell sx={{ color: "white" }}>Suc. Origen</TableCell>
              <TableCell sx={{ color: "white" }}>Suc. Destino</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Fecha Trasp.</TableCell>
              <TableCell sx={{ color: "white" }}>Usuario Origen</TableCell>
              <TableCell sx={{ color: "white" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transfersOutgoing.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.product.clave}</TableCell>
                <TableCell>{row.product.description}</TableCell>
                <TableCell>{row.product.category.name}</TableCell>
                <TableCell>{row.product?.line?.name ?? "N/A"}</TableCell>
                <TableCell>{row.product?.weight ?? "N/A"}</TableCell>
                <TableCell>{row.origin_branch.branch_name}</TableCell>
                <TableCell>{row.destination_branch.branch_name}</TableCell>

                <TableCell>
                  <Chip
                    label={STATUS[row.status].label}
                    color={STATUS[row.status].color}
                    size='large'
                  />
                </TableCell>

                <TableCell>{FormatDate(row.created_at)}</TableCell>
                <TableCell>{row.origin_user.name}</TableCell>

                <TableCell>
                  {row.status === 1 && (
                    <Button
                      onClick={() => respondTransfer(row.id, "cancel")}
                      variant='contained'
                      color='error'
                      size='large'
                    >
                      Cancelar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {transfersOutgoing.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} align='center'>
                  <Typography variant='body2' sx={{ py: 2 }}>
                    No se encontraron resultados.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación real con datos del backend */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={pagination.lastPage}
          page={pagination.currentPage}
          color='secondary'
          variant='outlined'
          shape='rounded'
          onChange={(e, value) => onPageChange(value)}
          size='large'
        />
      </Box>
    </Box>
  );
};

export default TableTransferOutgoing;
