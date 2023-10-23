import {IProduct, Product} from "../../models";
import {Model} from "mongoose";
import colors from "colors";

class DbFetcher {
  public static async getProducts(Product: Product): Promise<IProduct[]> {
    const model = await this.getProductModel(Product).find().sort({ItemNumber: 1});
    if (!model || model.length === 0) {
      console.error(colors.yellow(`No products found`));
      return model as IProduct[];
    }
    return model as IProduct[];
  }

  private static getProductModel(type: Product): Model<any> {
    return type.ProductModel;
  }
}

export default DbFetcher