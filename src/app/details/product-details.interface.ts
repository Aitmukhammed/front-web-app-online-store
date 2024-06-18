export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  pictureUrl: string;
  username: string | null; // username может быть null
}
