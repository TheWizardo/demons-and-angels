export interface Product {
    _id: string;
    isActive: boolean;
    nameEn: string;
    nameHe: string;
    requiresShipment: boolean;
    price: number;
    images: ImageMetadata[];
    discountedPrice?: number;
}

export interface ImageMetadata {
  _id: string;
  format: string; // e.g. "jpg", "png", "webp"
  width: number;
  height: number;
  isPrimary: boolean;
}

export interface CartItem extends Product {
  quantity: number
}