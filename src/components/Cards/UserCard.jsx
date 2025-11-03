import React, { useContext } from "react";
import {
  Paper,
  Typography,
  Avatar,
  Box,
  Divider,
  Stack,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import LockIcon from "@mui/icons-material/Lock";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UsersContext from "../../Context/Users/UsersContext";
const UserCard = ({ user }) => {
  const { disableUser } = useContext(UsersContext);
  if (!user) return null;
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 320,
        mx: "auto",
      }}
    >
      {/* Avatar del usuario */}
      <Avatar
        src={user.avatar || ""}
        alt={user.name}
        sx={{
          width: 80,
          height: 80,
          mb: 2,
          bgcolor: "#0F263C",
          fontSize: 32,
        }}
      >
        {!user.avatar && (user.name?.[0]?.toUpperCase() || <PersonIcon />)}
      </Avatar>

      {/* Información principal */}
      <Typography variant='h6' fontWeight='bold' textAlign='center'>
        {user.name || "Usuario sin nombre"}
      </Typography>
      <Typography
        variant='body2'
        color='text.secondary'
        textAlign='center'
        sx={{ mb: 1 }}
      >
        {user.email || "Correo no disponible"}
      </Typography>

      <Divider sx={{ width: "100%", my: 1.5 }} />

      {/* Información adicional (opcional) */}
      <Stack spacing={0.5} sx={{ width: "100%" }}>
        {user.type_user && <InfoItem label='Rol' value={user.type_user.name} />}
        {user.branch && (
          <InfoItem label='Sucursal' value={user.branch.branch_name} />
        )}
        {user.created_at && (
          <InfoItem
            label='Fecha de registro'
            value={new Date(user.created_at).toLocaleDateString()}
          />
        )}
      </Stack>
      <Divider sx={{ width: "100%", my: 1.5 }} />
      <Grid spacing={0.5} sx={{ width: "100%" }}>
        {user.type_user.id !== 1 && (
          <Tooltip title='Bloquear Usuario' placement='top'>
            <IconButton onClick={() => disableUser(user.id)}>
              <LockIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title='Editar usuario' placement='top'>
          <IconButton>
            <ManageAccountsIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Paper>
  );
};

// ✅ Subcomponente reutilizable
const InfoItem = ({ label, value }) => (
  <Box
    display='flex'
    justifyContent='space-between'
    sx={{ color: "text.secondary" }}
  >
    <Typography variant='body2' fontWeight={500}>
      {label}:
    </Typography>
    <Typography variant='body2' fontWeight={600} color='text.primary'>
      {value || "N/A"}
    </Typography>
  </Box>
);

export default UserCard;
