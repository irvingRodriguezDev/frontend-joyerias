import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../../../components/Layout/Layout";
import BranchesSelect from "../../selectOptions/BranchesSelect";
import { useParams } from "react-router-dom";
import ProductsSelectAdmin from "../../sales/Branches/SelectProducts";
import { formatPriceMX } from "../../../utils/PriceFormat";
import TransferContext from "../../../Context/Transfer/TransferContext";
import AuthContext from "../../../Context/Auth/AuthContext";
const AddTransferAdmin = () => {
  const params = useParams();
  const { id } = params;
  const { storeTransferAdmin } = useContext(TransferContext);
  const { usuario } = useContext(AuthContext);
  const [branchDestination, setBranchDestination] = useState("");
  const [productsTransfer, saveProductsTransfer] = useState([]);

  const detectarCambiosBranch = (value) => {
    setBranchDestination(value.value);
  };

  // 🔴 Eliminar producto
  const handleRemoveProduct = (id) => {
    saveProductsTransfer(productsTransfer.filter((p) => p.id !== id));
  };

  // 🚀 Enviar payload al backend
  const handleSubmit = () => {
    if (!branchDestination) {
      alert("Selecciona la sucursal destino");
      return;
    }
    if (productsTransfer.length === 0) {
      alert("Selecciona al menos un producto");
      return;
    }

    const payload = {
      branchId: id,
      new_branch_id: branchDestination,
      user_origin_id: usuario?.id ?? null,
      products: productsTransfer,
    };

    // Aquí llamas tu API:
    storeTransferAdmin(payload);

    // alert("Traspaso creado correctamente!");
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1400, mx: "auto", p: 2 }}>
        <Typography variant='h5' sx={{ mb: 2, fontWeight: "bold" }}>
          Crear Traspaso de Productos
        </Typography>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {/* Selección de sucursal destino */}
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            Sucursal destino
          </Typography>
          <BranchesSelect detectarCambiosBranch={detectarCambiosBranch} />

          <Divider sx={{ mb: 3 }} />
          <ProductsSelectAdmin
            branchId={id}
            productsList={productsTransfer}
            saveProductsList={saveProductsTransfer}
          />
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
                  <TableCell>Descripcion</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell align='center'>Quitar</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {productsTransfer.map((p, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{p.clave}</TableCell>
                    <TableCell>{p.description}</TableCell>
                    <TableCell>{formatPriceMX(Number(p.price))}</TableCell>
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

                {productsTransfer.length === 0 && (
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
    </Layout>
  );
};

export default AddTransferAdmin;
