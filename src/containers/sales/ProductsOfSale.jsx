import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TextField, Tooltip } from "@mui/material";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductsOfSale({ productsList, saveProductsList }) {
  // Función para manejar el cambio de precio
  const handlePriceChange = (index, newValue) => {
    const product = productsList[index];
    const min = Number(product.price_with_discount);
    const max = Number(product.price);
    const value = Number(newValue);

    // Validar rango
    if (value < min || value > max) return;

    const updatedList = [...productsList];
    updatedList[index] = {
      ...product,
      final_price: value,
    };

    // Actualiza estado del padre
    saveProductsList(updatedList);

    // 🔥 Actualiza localStorage
    localStorage.setItem("productsSale", JSON.stringify(updatedList));
  };
  const handleDeleteProduct = (index) => {
    // Crear copia del array sin el producto eliminado
    const updatedList = productsList.filter((_, i) => i !== index);

    // Actualizar estado del padre
    saveProductsList(updatedList);

    // Actualizar localStorage
    localStorage.setItem("productsSale", JSON.stringify(updatedList));
  };

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
              Descripción
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Categoría
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: "center" }}>
              Línea
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
              <StyledTableCell>{row.clave}</StyledTableCell>
              <StyledTableCell align='center'>
                <input
                  type='number'
                  value={row.final_price ?? row.price}
                  min={row.price_with_discount}
                  max={row.price}
                  step='0.01'
                  style={{
                    width: "100px",
                    height: "50px",
                    textAlign: "center",
                    padding: "4px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Permitir que el usuario escriba libremente
                    const updatedList = [...productsList];
                    updatedList[index] = {
                      ...row,
                      final_price: val, // temporalmente string, se valida en onBlur
                    };
                    saveProductsList(updatedList);
                  }}
                  onBlur={(e) => {
                    let value = parseFloat(e.target.value);
                    if (isNaN(value)) value = row.price; // default si no es número
                    // Validar rango
                    if (value < row.price_with_discount)
                      value = row.price_with_discount;
                    if (value > row.price) value = row.price;

                    const updatedList = [...productsList];
                    updatedList[index] = {
                      ...row,
                      final_price: value, // valor final validado
                    };
                    saveProductsList(updatedList);

                    // Guardar en localStorage
                    localStorage.setItem(
                      "productsSale",
                      JSON.stringify(updatedList)
                    );
                  }}
                />
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
                <Tooltip title='Eliminar producto' placement='top'>
                  <IconButton
                    color='error'
                    onClick={() => handleDeleteProduct(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
