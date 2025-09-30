import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UsersContext from "../../Context/Users/UsersContext";
const Users = () => {
  const { users, getAllUsers } = useContext(UsersContext);
  useEffect(() => {
    getAllUsers();
  }, []);
  console.log(users, "los usuarios");

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontSize='30px' fontWeight='bold' sx={{ color: "white" }}>
            Mis Usuarios
          </Typography>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={"/crear-usuario"}>
            <Button variant='contained' color='secondary'>
              Agregar
            </Button>
          </Link>
        </Grid>
        {users.map((user) => (
          <Grid size={4}>
            <Paper>
              <Typography color="'white">{user.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Users;
