import express from 'express';
import colors from "colors";
import dotenv from 'dotenv';
import {IProduct, mapImportData, Product} from "./models";
import DbParser from "./services/parser";
import {initDatabase, ProductInstance} from "./services/db";
import DbFetcher from "./services/fetcher";
import path from "path";

import cors from "cors";

import xmlparser from 'express-xml-bodyparser';

import hbs from "hbs";
import * as fs from "fs";
import {renderProduct} from "./components/search/product";

dotenv.config();

const app = express();
const port = 3000;
app.use(xmlparser({
  normalizeTags: false
}))
app.set('view engine', 'hbs');
app.use(cors());

app.post('/import', function (req, res, next) {
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

app.get('/export', async function (req, res) {
  const exportData = await DbFetcher.getProducts(ProductInstance, {ItemNumber: req.get('ItemID')});
  console.log(JSON.stringify(exportData, null, 2));
  res.send({exportData, quantity: exportData.length});
});

app.use(express.json());
app.use(express.urlencoded({extended: true})); // to parse x-www-form-urlencoded
app.post('/search', async function (req, res) {
  let searchTerm = req.body.searchTerm
  console.log(`request body: ${JSON.stringify(req.body, null, 2)}`);
  const products: IProduct[] = await DbFetcher.getProducts(ProductInstance, {
    ItemNumber: {$regex: new RegExp(searchTerm, 'i')}
  });
  let results = products.map(product => renderProduct(product)).join('');
  if (results === '') {
    results = 'Nichts gefunden'
  }

  res.render('index.hbs', {results});
});

app.post('/', function (req, res) {
  // TODO add User Interface (handlebars, like Huawei Fusion Plugin)
  console.log(`request body: ${JSON.stringify(req.body, null, 2)}`);
  console.log(`request headers: ${JSON.stringify(req.headers, null, 2)}`)
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`request origin: ${fullUrl}`)
  res.render(path.join('index.hbs'), {
    title: 'Thing'
  });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

async function main(): Promise<void> {
  try {
    console.log(process.env.MONGODB_CONNECT_STRING)
    await initDatabase();
    console.log("Hello World!");
  } catch (err) {
    throw err;
  }
}

main().then(() => {
  console.log(colors.bgGreen('Application executed successfully!'));
}).catch((err: Error) => {
  console.log(colors.bgRed(`Application executed with errors!\n error: ${err.message}`));
});