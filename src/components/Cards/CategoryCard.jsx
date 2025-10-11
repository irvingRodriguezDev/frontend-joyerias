import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "../icons/EditIcon";
const CategoryCard = ({ category }) => {
  return (
    <Paper>
      <Card sx={{ padding: "20px" }}>
        <CardHeader title={category.name} />
        <CardActions>
          <IconButton>
            <EditIcon width={40} />
          </IconButton>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default CategoryCard;
