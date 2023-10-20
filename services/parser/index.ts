import {IProduct, Product} from "../../models";
import colors from "colors";
import {ProductInstance} from "../db";

export default class DbParser {
  public async parseProduct(product: IProduct) {
    // Do some parsing stuff here
    const productData = ProductInstance.mapProductModel(product);
    const filter = {ItemNumber: product.ItemNumber};
    try {
      const model = await ProductInstance.ProductModel.find(filter);
      if (model.length > 0) {
        console.log(colors.bgYellow(`Same product data already exists {
          ItemNumber: ${product.ItemNumber},
          SupplierItemNumber: ${product.SupplierItemNumber}
         }
         ! Overwriting...`));
        delete productData._id;
        await ProductInstance.ProductModel.updateOne(filter, {$set: product});
      } else {
        const newProduct = new ProductInstance.ProductModel;
        newProduct.save();
        console.log(colors.bgGreen('Product saved successfully!'));
      }
    } catch (err) {
      console.error(err);
    }
  }
}