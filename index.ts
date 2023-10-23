import express from 'express';
import colors from "colors";
import dotenv from 'dotenv';
import {mapImportData} from "./models";
import DbParser from "./services/parser";
import {initDatabase} from "./services/db";

dotenv.config();

const app = express();
const port = 3000;

const xmlparser = require('express-xml-bodyparser');
app.use(xmlparser({
  normalizeTags: false
}))

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