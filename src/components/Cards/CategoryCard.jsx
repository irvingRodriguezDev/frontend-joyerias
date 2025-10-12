import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Typography,
  Divider,
  Tooltip,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import CategoriesContext from "../../Context/Categories/CategoriesContext";
const CategoryCard = ({ category }) => {
  const { deleteCategory } = useContext(CategoriesContext);
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(145deg, #f9f9f9 0%, #ffffff 100%)",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "none",
            p: 2,
          }}
        >
          <CardHeader
            titleTypographyProps={{
              variant: "h6",
              fontWeight: "bold",
              color: "primary.main",
            }}
            title={category.name}
            subheader={
              category.description
                ? category.description
                : "Sin descripción disponible"
            }
          />

          <CardContent sx={{ pt: 0 }}>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {category.created_at && (
                <Typography variant='body2' color='text.secondary'>
                  <strong>Creado:</strong>{" "}
                  {new Date(category.created_at).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Tooltip title='Editar categoría' arrow>
              <IconButton
                sx={{
                  color: "warning.main",
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "0.2s",
                  },
                }}
              >
                <EditIcon width={30} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Eliminar categoría' arrow>
              <IconButton
                onClick={() => deleteCategory(category.id)}
                sx={{
                  color: "warning.main",
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "0.2s",
                  },
                }}
              >
                <DeleteIcon width={30} />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Paper>
    </motion.div>
  );
};

export default CategoryCard;
