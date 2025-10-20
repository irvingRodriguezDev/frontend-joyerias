export function PriceFormat(value) {
  const number = Number(value);

  // Evita NaN o valores no numéricos
  if (isNaN(number)) return "0.00";

  // Formato numérico con comas y dos decimales
  return number.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// 💰 Formato monetario completo con símbolo MXN
export const formatPriceMX = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "$0.00";
  return number.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
};
