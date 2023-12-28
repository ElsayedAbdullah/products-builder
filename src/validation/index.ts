export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  function isValidHttpUrl(string: string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  const validImageUrl = isValidHttpUrl(product.imageURL);

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
    product.description.length > 800
  ) {
    errors.description = "description is between 3 and 800 characters";
  }

  if (!product.imageURL.trim() || !validImageUrl) {
    errors.imageURL = "image URL is not valid";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "price is required and must be a number";
  }

  return errors;
};
