import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, IconButton } from "@mui/material";
import { PriceFormat } from "../../../utils/PriceFormat";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#06121E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TablePayments({ payments }) {
  return (
    <Grid container spacing={2}>
      <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant='contained' color='secondary' size='large'>
          Agregar Pago
        </Button>
      </Grid>
      <Grid size={12}>
        <TableContainer component={Paper}>
          <Table aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>Fecha</StyledTableCell>
                <StyledTableCell align='center'>Monto</StyledTableCell>
                <StyledTableCell align='center'>Metodo de Pago</StyledTableCell>
                <StyledTableCell align='center'>Referencia</StyledTableCell>
                <StyledTableCell align='center'>Opciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments &&
                payments.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align='center'>
                      {row ? row.created_at : ""}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      $ {row ? PriceFormat(Number(row.amount)) : 0}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row
                        ? row.payment_method === "cash"
                          ? "Efectivo"
                          : "Tarjeta"
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row ? row.reference : ""}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <IconButton>
                        <PictureAsPdfIcon sx={{ color: "#173757" }} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
