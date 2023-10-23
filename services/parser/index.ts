import {IProduct} from "../../models";
import colors from "colors";
import {ProductInstance} from "../db";

class DbParser {
  public static async parseProducts(products: IProduct[], overwrite: boolean = false) {
    // Do some parsing stuff here
    for (const item of products) {
      const productData = ProductInstance.mapProductModel(item);
      const filter = {ItemNumber: item.ItemNumber};
      try {
        const model = await ProductInstance.ProductModel.find(filter);
        if (model.length > 0) {
          console.log(colors.bgYellow(`Same product data already exists {
          ItemNumber: ${item.ItemNumber},
          SupplierItemNumber: ${item.SupplierItemNumber}
         }`));
          delete productData._id;
          if (overwrite) {
            console.log(colors.bgYellow('Overwriting...'));
            await ProductInstance.ProductModel.updateOne(filter, {$set: item});
          } else {
            console.log(colors.bgYellow('Skipping...'));
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
}

export default DbParser