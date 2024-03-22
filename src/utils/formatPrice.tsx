export const formatPrice = (price: number) => {
  // if (Number.isInteger(price)) {
  //   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }
  return price
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const roundPriceToInt = (price: number) => {
  if (Number.isInteger(price)) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
