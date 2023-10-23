import {IProduct, Product} from "../../models";
import {Model} from "mongoose";
import colors from "colors";

export default class DbFetcher {
  public static async getProducts<T extends IProduct>(Product: Product): Promise<T[]> {
    const model = await this.getProductModel(Product).find().sort({ItemNumber: 1});
    if (!model || model.length === 0) {
      console.error(colors.yellow(`No products found`));
      return model as T[];
    }
    return model as T[];
  }

  public static async getStationData(Station: Product): Promise<any> {
    const model = await this.getProductModel(Station).find().sort({collectTime: 1});
    if (!model) {
      return model as IProduct[];
    }
    return model as IProduct[];
  }

  private static getProductModel(type: Product): Model<any> {
    return type.ProductModel;
  }
}