export const generateColorCode = (
  colors: { backgroundColor: string; borderColor: string }[]
) => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};
