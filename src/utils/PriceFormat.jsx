export function PriceFormat(number) {
  const PRICEFOMART = Number(number).toFixed(2);
  return PRICEFOMART;
}

export const formatPriceMX = Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});
