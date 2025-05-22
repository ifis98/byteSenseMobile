export const toNumber = value => {
  if (value == null) {
    return null;
  }
  let num = value;
  if (typeof value === 'object' && '$numberDecimal' in value) {
    num = value.$numberDecimal;
  }
  if (typeof num === 'string') {
    num = parseFloat(num);
  } else {
    num = Number(num);
  }
  return isNaN(num) ? null : num;
};
