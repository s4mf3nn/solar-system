// Capitalize the first letter of a string
export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
