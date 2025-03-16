export const getImage = (image) => {
  if (image == null) {
    return null;
  }
  return `data:image/jpeg;base64, ${image}`;
};
