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
import DeleteIcon from "@mui/icons-material/Delete";
import { PriceFormat } from "../../utils/PriceFormat";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ProductsOfSale({ productsList }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Clave
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Precio Final
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Descripcion
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Categoria
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Linea
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>Peso</StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Precio Min
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Precio Max
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Opciones
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsList.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component='th' scope='row'>
                {row.clave}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <input />
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.description}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.category}</StyledTableCell>
              <StyledTableCell align='center'>{row.line}</StyledTableCell>
              <StyledTableCell align='center'>{row.weight}</StyledTableCell>
              <StyledTableCell align='center'>
                ${PriceFormat(Number(row.price_with_discount))}
              </StyledTableCell>
              <StyledTableCell align='center'>
                ${PriceFormat(Number(row.price))}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <IconButton>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
