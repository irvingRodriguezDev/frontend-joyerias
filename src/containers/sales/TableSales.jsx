import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IconButton, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
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

export default function TableSales({ sale }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='customized table' sx={{ borderRadius: "12px" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Folio</StyledTableCell>
            <StyledTableCell align='center'>Cliente</StyledTableCell>
            <StyledTableCell align='center'>sucursal</StyledTableCell>
            <StyledTableCell align='center'>Total</StyledTableCell>
            <StyledTableCell align='center'>Total Pagado</StyledTableCell>
            <StyledTableCell align='center'>Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sale.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell scope='row' align='center'>
                {row.folio}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.client?.name} {row.client?.lastname}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.branch?.branch_name}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.total}</StyledTableCell>
              <StyledTableCell align='center'>{row.paid_out}</StyledTableCell>
              <StyledTableCell align='center'>
                <IconButton>
                  <Tooltip placement='top' title='Descargar PDF'>
                    <PictureAsPdfIcon sx={{ color: "#06121E" }} />
                  </Tooltip>
                </IconButton>
                <IconButton>
                  <Tooltip placement='top' title='Ver detalle '>
                    <RemoveRedEyeIcon sx={{ color: "#06121E" }} />
                  </Tooltip>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
