// 📁 src/components/ProductsTable.jsx
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
} from "@mui/material";
import { PriceFormat } from "../../utils/PriceFormat";
import EditIcon from "../icons/EditIcon";
import EyeIcon from "../icons/EyeIcon";
import { Link } from "react-router-dom";
const ProductsTable = ({ data, onPageChange }) => {
  const [filteredData, setFilteredData] = useState(data || []);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    line: "",
  });

  // Actualizar cuando cambie la data
  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  // 🔍 Filtrar datos localmente
  useEffect(() => {
    if (!data) return;
    let result = [...data];

    if (filters.search) {
      result = result.filter(
        (p) =>
          p.clave.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category?.name === filters.category);
    }

    if (filters.status) {
      result = result.filter((p) => p.status?.name === filters.status);
    }
    if (filters.line) {
      result = result.filter((p) => p.line?.name === filters.line);
    }

    setFilteredData(result);
  }, [filters, data]);

  const handleChangePage = (event, page) => {
    if (onPageChange) onPageChange(page);
  };

  const uniqueCategories = [...new Set(data.map((p) => p.category?.name))];
  const uniqueStatuses = [...new Set(data.map((p) => p.status?.name))];
  const uniqueLines = [...new Set(data.map((p) => p.line?.name))];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Lista de Productos
      </Typography>

      {/* 🎯 Filtros */}
      <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
        <TextField
          label='Buscar producto'
          variant='outlined'
          fullWidth
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={filters.category}
            label='Categoría'
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <MenuItem value=''>Todas</MenuItem>
            {uniqueCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Linea</InputLabel>
          <Select
            value={filters.line}
            label='Linea'
            onChange={(e) => setFilters({ ...filters, line: e.target.value })}
          >
            <MenuItem value=''>Todas</MenuItem>
            {uniqueLines.map((line) => (
              <MenuItem key={line} value={line}>
                {line}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={filters.status}
            label='Estado'
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <MenuItem value=''>Todos</MenuItem>
            {uniqueStatuses.map((st) => (
              <MenuItem key={st} value={st}>
                {st}
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
              <TableCell>Clave</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Linea</TableCell>
              <TableCell>P. venta</TableCell>
              <TableCell>P/c Descuento</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Sucursal</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.clave}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>{product.line?.name ?? "N/A"}</TableCell>
                  <TableCell>${PriceFormat(Number(product.price))}</TableCell>
                  <TableCell>
                    ${PriceFormat(Number(product.price_with_discount))}
                  </TableCell>
                  <TableCell>{product.status?.name}</TableCell>
                  <TableCell>{product.branch?.branch_name}</TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon width={40} />
                    </IconButton>
                    <Link to={`/detalle-producto/${product.id}`}>
                      <IconButton>
                        <EyeIcon width={40} />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align='center'>
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
          count={data.last_page}
          page={data.current_page}
          onChange={handleChangePage}
          color='primary'
        />
      </Box>
    </Paper>
  );
};

export default ProductsTable;
