export const STATUS_CONFIG = {
  pending: { label: "Pendiente", bg: "rgba(255,193,7,0.15)", color: "#856404" },
  sent: { label: "Enviada", bg: "rgba(13,110,253,0.12)", color: "#084298" },
  accepted: { label: "Aceptada", bg: "rgba(25,135,84,0.12)", color: "#0a3622" },
  rejected: {
    label: "Rechazada",
    bg: "rgba(220,53,69,0.12)",
    color: "#842029",
  },
  expired: {
    label: "Expirada",
    bg: "rgba(108,117,125,0.15)",
    color: "#41464b",
  },
  spam: { label: "Spam", bg: "rgba(108,117,125,0.15)", color: "#41464b" },
};

export const TRIP_LABEL = {
  one_way: "Sencillo",
  round_trip: "Redondo",
};

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatPrice(price) {
  if (!price) return null;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);
}
