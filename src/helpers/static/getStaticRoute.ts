export const getStaticRoute = (itemName: string) => {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL;

  return `${BASE_URL}static/${itemName}`;
};
