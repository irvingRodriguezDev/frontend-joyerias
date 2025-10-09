import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { PriceFormat } from "../../../utils/PriceFormat";
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

export default function CustomizedTables({ details }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Clave</StyledTableCell>
            <StyledTableCell align='center'>Descripcion</StyledTableCell>
            <StyledTableCell align='center'>Categoria</StyledTableCell>
            <StyledTableCell align='center'>Linea</StyledTableCell>
            <StyledTableCell align='center'>Peso</StyledTableCell>
            <StyledTableCell align='center'>Precio</StyledTableCell>
            <StyledTableCell align='center'>Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(details) &&
            details.map((row) => {
              const product = row?.product || {};
              const category = product.category || {};
              const line = product.line || {};

              return (
                <StyledTableRow
                  key={row.id || product.id || crypto.randomUUID()}
                >
                  <StyledTableCell align='center'>
                    {product.clave || "—"}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.description || "—"}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {category.name || "—"}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {line.name || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.weight ?? "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    ${" "}
                    {row?.final_price
                      ? PriceFormat(Number(row.final_price))
                      : "0.00"}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <IconButton>
                      <ReplayIcon sx={{ color: "#173757" }} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
