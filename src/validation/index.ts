export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validImageUrl = product.imageURL.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );

  if (
    !product.title.trim() ||
    product.title.length < 3 ||
    product.title.length > 50
  ) {
    errors.title = "Title is between 3 and 50 characters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 3 ||
    product.description.length > 50
  ) {
    errors.description = "description is between 3 and 50 characters";
  }

  if (!product.price.trim() || !validImageUrl) {
    errors.imageURL = "image URL is not valid";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "price is required and must be a number";
  }

  return errors;
};
