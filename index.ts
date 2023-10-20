import express from 'express';
import colors from "colors";
import dotenv from 'dotenv';

dotenv.config();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.text();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log(req.body);
});

app.post('/', jsonParser, function (req, res) {
  res.json({requestBody: req.body})
})
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