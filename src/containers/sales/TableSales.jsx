import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const SalesTable = ({
  data,
  handleChangePage,
  lastPage,
  currentPage,
  downloadTicketSale,
}) => {
  const [filteredData, setFilteredData] = useState(data?.data || []);
  const [filters, setFilters] = useState({
    search: "",
    branch: "",
  });

  // Actualizar cuando cambie la data
  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  // 🔍 Filtrado local
  useEffect(() => {
    if (!data) return;
    let result = [...data];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.folio?.toString().includes(term) ||
          (s.client?.name?.toLowerCase().includes(term) ?? false) ||
          (s.client?.lastname?.toLowerCase().includes(term) ?? false)
      );
    }

    if (filters.branch) {
      result = result.filter((s) => s.branch?.branch_name === filters.branch);
    }

    setFilteredData(result);
  }, [filters, data]);

  const uniqueBranches = [...new Set(data.map((s) => s.branch?.branch_name))];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Ventas
      </Typography>

      {/* 🎯 Filtros */}
      <Stack direction='row' spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
        <TextField
          label='Buscar folio o cliente'
          variant='outlined'
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          sx={{ minWidth: 400 }}
        />

        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Sucursal</InputLabel>
          <Select
            value={filters.branch}
            label='Sucursal'
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          >
            <MenuItem value=''>Todas</MenuItem>
            {uniqueBranches.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* 🧾 Tabla */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Folio</TableCell>
              <TableCell align='center'>Cliente</TableCell>
              <TableCell align='center'>Sucursal</TableCell>
              <TableCell align='center'>Total</TableCell>
              <TableCell align='center'>Total Pagado</TableCell>
              <TableCell align='center'>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center'>{row.folio}</TableCell>
                  <TableCell align='center'>
                    {row.client?.name} {row.client?.lastname}
                  </TableCell>
                  <TableCell align='center'>
                    {row.branch?.branch_name}
                  </TableCell>
                  <TableCell align='center'>{row.total}</TableCell>
                  <TableCell align='center'>{row.paid_out}</TableCell>
                  <TableCell align='center'>
                    <Tooltip title='Descargar PDF'>
                      <IconButton onClick={() => downloadTicketSale(row.id)}>
                        <PictureAsPdfIcon sx={{ color: "#06121E" }} />
                      </IconButton>
                    </Tooltip>
                    <Link to={`/detalle-venta/${row.id}`}>
                      <Tooltip title='Ver detalle'>
                        <IconButton>
                          <RemoveRedEyeIcon sx={{ color: "#06121E" }} />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📄 Paginación */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={lastPage}
          variant='outlined'
          shape='rounded'
          onChange={handleChangePage}
          color='secondary'
          page={currentPage}
          size='large'
          sx={{
            color: "#880e4f",
            "&:hover": { color: "#f06292" },
          }}
        />
      </Box>
    </Paper>
  );
};

export default SalesTable;
