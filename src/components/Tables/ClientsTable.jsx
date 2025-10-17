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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const ClientsTable = ({ data, handleChangePage, lastPage, currentPage }) => {
  const [filteredData, setFilteredData] = useState(data?.data || []);
  const [filters, setFilters] = useState({
    name: "",
    lastname: "",
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

    if (filters.name) {
      result = result.filter((c) =>
        c.name?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.lastname) {
      result = result.filter((c) =>
        c.lastname?.toLowerCase().includes(filters.lastname.toLowerCase())
      );
    }

    if (filters.branch) {
      result = result.filter((c) => c.branch?.branch_name === filters.branch);
    }

    setFilteredData(result);
  }, [filters, data]);

  const uniqueBranches = [...new Set(data.map((c) => c.branch?.branch_name))];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Clientes
      </Typography>

      {/* 🎯 Filtros */}
      <Stack direction='row' spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
        <TextField
          label='Nombre'
          variant='outlined'
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          sx={{ minWidth: 450 }}
        />
        <TextField
          label='Apellido'
          variant='outlined'
          value={filters.lastname}
          onChange={(e) => setFilters({ ...filters, lastname: e.target.value })}
          sx={{ minWidth: 350 }}
        />
        <FormControl sx={{ minWidth: 350 }}>
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
              <TableCell align='center'>Nombre</TableCell>
              <TableCell align='center'>Apellido</TableCell>
              <TableCell align='center'>Teléfono</TableCell>
              <TableCell align='center'>Sucursal</TableCell>
              <TableCell align='center'>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center'>{row.name}</TableCell>
                  <TableCell align='center'>{row.lastname}</TableCell>
                  <TableCell align='center'>{row.phone}</TableCell>
                  <TableCell align='center'>
                    {row.branch?.branch_name}
                  </TableCell>
                  <TableCell align='center'>
                    <Link to={`/detalle-cliente/${row.id}`}>
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

export default ClientsTable;
