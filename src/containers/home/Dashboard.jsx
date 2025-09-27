import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { Typography } from "@mui/material";
import CardWelcome from "../../components/home/CardWelcome";
import AuthContext from "../../Context/Auth/AuthContext";
const Dashboard = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <Layout>
        <CardWelcome name={usuario ? usuario.name : ""} />
      </Layout>
    </>
  );
};

export default Dashboard;
