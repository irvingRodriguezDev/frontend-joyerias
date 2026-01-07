import React, { useContext, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { formatPriceMX } from "../../utils/PriceFormat";
import GramosContext from "../../Context/Gramos/GramosContext";

const SectionInfoGrs = () => {
  const {
    total_gramos,
    total_dinero_gramos,
    total_gramos_existentes,
    total_dinero_gramos_existentes,
    total_gramos_traspasados,
    total_dinero_gramos_traspasados,
    total_gramos_danados,
    total_dinero_gramos_danados,
    totalGramos,
    totalDineroGramos,
    totalGramosExistentes,
    totalDineroGramosExistente,
    totalGramosTraspasados,
    totalDineroGramosTraspasados,
    totalGramosDanados,
    totalDineroGramosDanados,
  } = useContext(GramosContext);

  useEffect(() => {
    totalGramos();
    totalDineroGramos();
    totalGramosExistentes();
    totalDineroGramosExistente();
    totalGramosTraspasados();
    totalDineroGramosTraspasados();
    totalGramosDanados();
    totalDineroGramosDanados();
  }, []);

  // 💡 Datos estructurados para evitar repetición
  const cards = [
    {
      label: "Total de Gramos",
      value: `${total_gramos ?? 0} gr`,
    },
    {
      label: "Total de Gramos Existentes",
      value: `${total_gramos_existentes} gr`,
    },
    {
      label: "Total de Gramos Traspasados",
      value: `${total_gramos_traspasados ?? 0} gr`,
    },
    { label: "Total de Gramos Dañados", value: `${total_gramos_danados} gr` },
    {
      label: "Total de Dinero por Gramo",
      value: ` ${formatPriceMX(Number(total_dinero_gramos || 0))}`,
    },
    {
      label: "Total en Productos Existentes",
      value: ` ${formatPriceMX(Number(total_dinero_gramos_existentes || 0))}`,
    },
    {
      label: "Total en Productos Traspasados",
      value: ` ${formatPriceMX(Number(total_dinero_gramos_traspasados || 0))}`,
    },
    {
      label: "Total en Productos Dañados",
      value: ` ${formatPriceMX(Number(total_dinero_gramos_danados || 0))}`,
    },
  ];

  const paperStyle = {
    backgroundColor: "#173757",
    borderRadius: "20px",
    padding: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  };

  const textStyle = { color: "white", fontWeight: 500 };

  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Paper sx={paperStyle}>
            <Typography sx={{ ...textStyle, fontSize: "1rem" }}>
              {card.label}
            </Typography>
            <Typography sx={{ ...textStyle, fontSize: "1.2rem", marginTop: 1 }}>
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SectionInfoGrs;
