export interface ProductDetails {
  category: number | null;
  id: number;
  name: string;
  price: number;
  pictureUrl: string;
  username: string | null; // username может быть null
}
