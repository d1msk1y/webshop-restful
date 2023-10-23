import mongoose, {mongo} from "mongoose";

export interface IImportRequest {
  ItemList: {
    Header: {
      PriceProvider: string;
      Date: string;
    }
    Items: IProduct[];
  }
}

export function mapImportData(data: any): IImportRequest {
  return {
    ItemList: {
      Header: {
        PriceProvider: data.Artikelliste.Header[0].Preisanbieter[0],
        Date: data.Artikelliste.Header[0].Datum[0]
      },
      Items: data.Artikelliste.Artikel.map((artikel: any) => ({
        ItemNumber: artikel.ENr[0],
        SupplierItemNumber: artikel.LieferantenArtikelNummer[0],
        SupplierNumber: artikel.LieferantenNummer[0],
        SupplierName: artikel.LieferantenName[0],
        DeliveryStatus: artikel.Lieferstatus[0],
        Price: parseFloat(artikel.Preis[0]),
        PriceRange: parseInt(artikel.Preismenge[0]), // Assuming "Preismenge" is a numerical value
        Discount: parseFloat(artikel.Rabatt[0].replace('%', '')),
        ProductGroup: artikel.Warengruppe[0],
        Logistic: {
          MeasureUnit: artikel.Logistik[0].Masseinheit[0],
          ContentUnit: artikel.Logistik[0].Inhaltseinheit[0],
          Quantity: parseFloat(artikel.Logistik[0].Inhaltsmenge[0]),
          MinQuantity: parseFloat(artikel.Logistik[0].Mindestbestellmenge[0])
        }
      }))
    }
  };
}


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