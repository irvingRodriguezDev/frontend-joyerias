// 📁 src/components/ProductsTable.jsx
import React, { useContext, useEffect, useState } from "react";
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
import EditIcon from "../../components/icons/EditIcon";
import EyeIcon from "../../components/icons/EyeIcon";
import { Link } from "react-router-dom";
import ProductsContext from "../../Context/Products/ProductsContext";
import formatDate from "../../utils/FormatDate";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeparturesContext from "../../Context/Departures/DeparturesContext";
const TableDepartures = ({ data, handleChangePage, lastPage, currentPage }) => {
  const { getAllProductsNoPaginate, products } = useContext(ProductsContext);
  const { downloadTicketDeparture } = useContext(DeparturesContext);

  useEffect(() => {
    getAllProductsNoPaginate();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    line: "",
  });

  // Saber si hay algún filtro activo o búsqueda
  const isFiltering =
    filters.search || filters.category || filters.status || filters.line;

  // Actualizar la data base según si hay filtros o no
  useEffect(() => {
    if (isFiltering) {
      // Si hay búsqueda o filtros, usar products del context
      setFilteredData(products || []);
    } else {
      // Si no hay filtros activos, usar la data paginada
      setFilteredData(data || []);
    }
  }, [data, products, isFiltering]);

  // Aplicar filtros localmente
  useEffect(() => {
    const baseData = isFiltering ? products : data;
    if (!baseData) return;

    let result = [...baseData];

    if (filters.search) {
      result = result.filter(
        (p) =>
          p.clave?.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description?.toLowerCase().includes(filters.search.toLowerCase())
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
  }, [filters, data, products]);

  const uniqueCategories = [
    ...new Set((isFiltering ? products : data)?.map((p) => p.category?.name)),
  ].filter(Boolean);
  const uniqueStatuses = [
    ...new Set((isFiltering ? products : data)?.map((p) => p.status?.name)),
  ].filter(Boolean);
  const uniqueLines = [
    ...new Set((isFiltering ? products : data)?.map((p) => p.line?.name)),
  ].filter(Boolean);

  return (
    <Paper sx={{ p: 3 }}>
      {" "}
      {/* 🎯 Filtros */}
      {/* <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
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
          <InputLabel>Línea</InputLabel>
          <Select
            value={filters.line}
            label='Línea'
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
      </Stack> */}
      {/* 🧾 Tabla */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Folio</TableCell>
              <TableCell>Autorizo</TableCell>
              <TableCell>Recibe</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.auth}</TableCell>
                  <TableCell>{product.recibe}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{formatDate(product.created_at)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => downloadTicketDeparture(product.id)}
                    >
                      <PictureAsPdfIcon
                        sx={{ color: "#06121E", fontSize: "40px" }}
                      />
                    </IconButton>
                    <Link to={`/detalle-salida/${product.id}`}>
                      <IconButton>
                        <EyeIcon width={40} />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align='center'>
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 📄 Paginación (solo si no se está filtrando) */}
      {!isFiltering && lastPage > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Stack
            spacing={2}
            sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
          >
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
          </Stack>
        </Box>
      )}
    </Paper>
  );
};

export default TableDepartures;
