import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// 🔹 Estos métodos puedes conectarlos a tu API
// Por ahora se usan datos ficticios

const fakeBranches = [
  { id: 1, name: "Sucursal Centro" },
  { id: 2, name: "Sucursal Norte" },
  { id: 3, name: "Sucursal Sur" },
];

const fakeProducts = [
  { id: 21, code: "A001", name: "Anillo Oro 10k", price: 1299, status_id: 2 },
  { id: 22, code: "C441", name: "Cadena Plata", price: 499, status_id: 2 },
  { id: 23, code: "R312", name: "Reloj Acero", price: 899, status_id: 2 },
];

const AddTransfer = ({ user, sendTransfer }) => {
  const [branchDestination, setBranchDestination] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(fakeProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // 🔎 Filtrar productos por texto
  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredProducts(
      fakeProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.code.toLowerCase().includes(lower)
      )
    );
  }, [search]);

  // 🟢 Agregar producto a la lista final
  const handleAddProduct = (product) => {
    if (selectedProducts.some((p) => p.id === product.id)) return;
    setSelectedProducts([...selectedProducts, product]);
  };

  // 🔴 Eliminar producto
  const handleRemoveProduct = (id) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  // 🚀 Enviar payload al backend
  const handleSubmit = () => {
    if (!branchDestination) {
      alert("Selecciona la sucursal destino");
      return;
    }
    if (selectedProducts.length === 0) {
      alert("Selecciona al menos un producto");
      return;
    }

    const payload = {
      branch_destination_id: branchDestination,
      user_origin_id: user?.id ?? null,
      productsList: selectedProducts.map((p) => p.id),
    };

    console.log("Payload para API:", payload);

    // Aquí llamas tu API:
    // sendTransfer(payload);

    alert("Traspaso creado correctamente!");
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      <Typography variant='h5' sx={{ mb: 2, fontWeight: "bold" }}>
        Crear Traspaso de Productos
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        {/* Selección de sucursal destino */}
        <Typography sx={{ fontWeight: 600, mb: 1 }}>
          Sucursal destino
        </Typography>
        <TextField
          select
          fullWidth
          size='small'
          value={branchDestination}
          onChange={(e) => setBranchDestination(e.target.value)}
          sx={{ mb: 3 }}
          label='Seleccionar sucursal'
        >
          {fakeBranches.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              {b.name}
            </MenuItem>
          ))}
        </TextField>

        <Divider sx={{ mb: 3 }} />

        {/* Buscador de productos */}
        <Typography sx={{ fontWeight: 600, mb: 1 }}>
          Buscar productos (solo status existente)
        </Typography>

        <TextField
          fullWidth
          size='small'
          placeholder='Buscar por nombre o código...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tabla de productos disponibles */}
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
          <Table size='small'>
            <TableHead sx={{ background: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell align='center'>Acción</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.code}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      color='primary'
                      onClick={() => handleAddProduct(p)}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align='center' sx={{ py: 2 }}>
                    Sin resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 3 }} />

        {/* Lista de productos seleccionados */}
        <Typography sx={{ fontWeight: 600, mb: 1 }}>
          Productos seleccionados
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size='small'>
            <TableHead sx={{ background: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell align='center'>Quitar</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedProducts.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.code}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      color='error'
                      onClick={() => handleRemoveProduct(p.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {selectedProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align='center' sx={{ py: 2 }}>
                    Aún no se han seleccionado productos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Crear Traspaso
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddTransfer;
