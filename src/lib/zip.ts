/** Returns true if the ZIP code is within Connecticut's range (06001–06928) */
export const isCtZip = (zip: string): boolean => {
  if (!/^\d{5}$/.test(zip)) return false;
  const n = parseInt(zip, 10);
  return n >= 6001 && n <= 6928;
};
