import {IProduct, Product} from "../../models";
import colors from "colors";
import {ProductInstance} from "../db";

export default class DbParser {
  public static async parseProduct(product: IProduct, overwrite: boolean = false) {
    // Do some parsing stuff here
    const productData = ProductInstance.mapProductModel(product);
    const filter = {ItemNumber: product.ItemNumber};
    try {
      const model = await ProductInstance.ProductModel.find(filter);
      if (model.length > 0) {
        console.log(colors.bgYellow(`Same product data already exists {
          ItemNumber: ${product.ItemNumber},
          SupplierItemNumber: ${product.SupplierItemNumber}
         }`));
        delete productData._id;
        if (overwrite) {
          console.log(colors.bgYellow('Overwriting...'));
          await ProductInstance.ProductModel.updateOne(filter, {$set: product});
        } else {
          console.log(colors.bgYellow('Skipping...'));
          return;
        }
      } else {
        productData.save();
        console.log(colors.bgGreen('Product saved successfully!'));
      }
    } catch (err) {
      console.error(err);
    }
  }
}