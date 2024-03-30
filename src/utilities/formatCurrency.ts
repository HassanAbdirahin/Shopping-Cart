const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
  currency: "GBP",
  style: "currency",
});

export const formatCurrency = (value: number) => {
  return CURRENCY_FORMATER.format(value);
};
