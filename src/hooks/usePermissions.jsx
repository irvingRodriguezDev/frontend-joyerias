import { useMemo } from "react";

const menuPermissions = {
  productos: {
    type_user: [1, 2],
    permissions: (type_user) => ({
      read: true,
      write: type_user === 1,
      update: type_user === 1,
      delete: type_user === 1,
    }),
  },
  ventas: {
    type_user: [1, 2],
    permissions: (type_user) => ({
      read: true,
      write: true,
      update: type_user === 1,
      delete: type_user === 1,
    }),
  },
  usuarios: {
    type_user: [1],
    permissions: () => ({
      read: true,
      write: true,
      update: true,
      delete: true,
    }),
  },
  reportes: {
    type_user: [1, 2],
    permissions: (type_user) => ({
      read: true,
      write: false,
      update: false,
      delete: false,
    }),
  },
};

export const usePermissions = (moduleKey) => {
  const userData = JSON.parse(localStorage.getItem("type_user_id")) || {};
  const type_user = userData; // por defecto vendedor

  const moduleConfig = menuPermissions[moduleKey];

  const perms = useMemo(() => {
    if (!moduleConfig) {
      return { read: false, write: false, update: false, delete: false };
    }

    const allowed = moduleConfig.type_user.includes(type_user);
    if (!allowed) {
      return { read: false, write: false, update: false, delete: false };
    }

    return moduleConfig.permissions(type_user);
  }, [type_user, moduleKey]);

  return perms;
};
