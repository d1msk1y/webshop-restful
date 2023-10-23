import {IProduct, Product} from "../../models";
import {Model} from "mongoose";
import colors from "colors";
import DbParser from "../parser";

export default class DbFetcher {
  public static async getProducts<T extends IProduct>(Product: Product): Promise<T[]> {
    const model = await this.getProductModel(Product).find().sort({ItemNumber: 1});
    if (!model || model.length === 0) {
      console.error(colors.yellow(`No products found`));
      return model as T[];
    }
    return model as T[];
  }

  private static getProductModel(type: Product): Model<any> {
    return type.ProductModel;
  }
}