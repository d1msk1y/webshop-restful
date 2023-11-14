import {IProduct, Product} from "../../models";
import colors from "colors";
import {Document} from "mongodb";


class DbFetcher {
  public static async getProducts(product: Product, filter: {}): Promise<IProduct[]> {
    const model = await this.getProductModel(product).find(filter);
    if (!model || model.length === 0) {
      console.error(colors.yellow(`No products found`));
      return model;
    }
    return model;
  }

  private static getProductModel(type: Product): Document {
    return type.ProductModel;
  }
}

export default DbFetcher