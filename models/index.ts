export interface ILogistic {
  MeasureUnit: string;
  ContentUnit: string;
  Quantity: number;
  MinQuantity: number;
}

export interface IProduct {
  ItemNumber: string;
  SupplierItemNumber: string;
  SupplierNumber: string;
  SupplierName: string;
  DeliveryStatus: string;
  Price: number;
  PriceRange: number; // No idea what it is `Preismenge`
  Discount: number;
  ProductGroup: string;
  Logistic: ILogistic;
}