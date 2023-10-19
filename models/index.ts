import mongoose, {mongo} from "mongoose";

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

export class Product {
  public collectionName: string = 'products';
  public Schema: mongoose.Schema = new mongoose.Schema({
    ItemNumber: String,
    SupplierItemNumber: String,
    SupplierNumber: String,
    SupplierName: String,
    DeliveryStatus: String,
    Price: Number,
    PriceRange: Number,
    Discount: Number,
    ProductGroup: String,
    Logistic: {
      MeasureUnit: String,
      ContentUnit: String,
      Quantity: Number,
      MinQuantity: Number
    }
  });

  public ProductModel: mongoose.Model<any, {}> = mongoose.model(this.collectionName, this.Schema);

  public mapProductModel(product: IProduct) {
    return new this.ProductModel({
      ItemNumber: product.ItemNumber,
      SupplierItemNumber: product.SupplierItemNumber,
      SupplierNumber: product.SupplierNumber,
      SupplierName: product.SupplierName,
      DeliveryStatus: product.DeliveryStatus,
      Price: product.Price,
      PriceRange: product.PriceRange,
      Discount: product.Discount,
      ProductGroup: product.ProductGroup,
      Logistic: {
        MeasureUnit: product.Logistic.MeasureUnit,
        ContentUnit: product.Logistic.ContentUnit,
        Quantity: product.Logistic.Quantity,
        MinQuantity: product.Logistic.MinQuantity
      }
    });
  }
}