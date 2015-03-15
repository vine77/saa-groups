export default function(number) {
  if (typeof number !== 'number') number = parseFloat(number);
  return parseFloat(number.toPrecision(12));
}
