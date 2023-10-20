import express from 'express';
import colors from "colors";
import dotenv from 'dotenv';
import {mapImportRequest} from "./models";

dotenv.config();

const app = express();
const port = 3000;

const xmlparser = require('express-xml-bodyparser');
app.use(xmlparser({
  normalizeTags: false
}))

app.post('/', function (req, res, next) {
  console.log('Raw XML: ' + req.body);
  console.log('Parsed XML: ' + JSON.stringify(req.body, null, 2));
  const importData = mapImportRequest(req.body);
  console.log(importData.ItemList.Items[0]);

  res.send('OK' + req.body.ENr);
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

async function main(): Promise<void> {
  try {
    console.log(process.env.MONGODB_CONNECT_STRING)
    // await initDatabase();
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