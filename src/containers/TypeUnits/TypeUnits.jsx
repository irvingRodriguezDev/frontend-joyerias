import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UnitsContext from "../../Context/Units/UnitsContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UnitTypeCard from "../../components/Cards/UnitTypeCard";
import UnitFormModal from "../../components/Units/UnitFormModal";

const TypeUnits = () => {
  const { units, getAllUnits, deleteUnits } = useContext(UnitsContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [unitToEdit, setUnitToEdit] = useState(null);

  useEffect(() => {
    getAllUnits();
  }, []);

  const handleCreate = () => {
    setUnitToEdit(null);
    setModalOpen(true);
  };

  const handleEdit = (unit) => {
    setUnitToEdit(unit);
    setModalOpen(true);
  };

  const handleClose = () => {
    setUnitToEdit(null);
    setModalOpen(false);
  };

  return (
    <Layout>
      <Box sx={{ mt: 10 }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant='h5' fontWeight={600} color='#fff'>
            Tipos de unidad
          </Typography>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{ borderRadius: "10px" }}
          >
            Nueva unidad
          </Button>
        </Box>

        <Grid container spacing={3}>
          {units.map((unit) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={unit.id}>
              <UnitTypeCard
                unitType={unit}
                onEdit={handleEdit}
                onDelete={(u) => deleteUnits(u.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <UnitFormModal
        open={modalOpen}
        onClose={handleClose}
        unitToEdit={unitToEdit}
      />
    </Layout>
  );
};

export default TypeUnits;
