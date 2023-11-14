import xmlparser from "express-xml-bodyparser";
import {mapImportData} from "../models";
import DbParser from "../services/parser";
import colors from "colors";
import DbFetcher from "../services/fetcher";
import {ProductInstance} from "../services/db";
import express from "express";

const router = express.Router();
router.use(xmlparser({
  normalizeTags: false
}))


router.use(xmlparser({
  normalizeTags: false
}))
router.post('/import', function (req, res, next) {
  const overwrite = req.get('overwrite') === 'true';
  console.log('Overwrite: ' + overwrite)
  console.log('Raw XML: ' + req.body);
  console.log('Parsed XML: ' + JSON.stringify(req.body, null, 2));
  const importData = mapImportData(req.body);
  console.log(importData.ItemList.Items[0]);
  DbParser.parseProducts(importData.ItemList.Items, overwrite).then(r =>
    console.log(colors.bgGreen('Products saved successfully!'))
  );
  res.send('OK ' + JSON.stringify(importData.ItemList.Items[0], null, 2));
});

router.get('/export', async function (req, res) {
  const exportData = await DbFetcher.getProducts(ProductInstance, {ItemNumber: req.get('ItemID')});
  console.log(JSON.stringify(exportData, null, 2));
  res.send({exportData, quantity: exportData.length});
});

export default router;